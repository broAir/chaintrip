import Replicate from "replicate";
import * as nearApi from "near-api-js";
import { connectToNear } from "../blockchain/near.connection.js";
import { corcelTextToImage } from "../ai/corcel.js";
const { Contract } = nearApi;

const contractId = "corgi-trip.testnet";

const replicate = new Replicate();

const validateInput = (prompt) => {
    return prompt && prompt.length > 0 && prompt.length < 21;
}

// TODO ensure that users can only attempt to generate an image 10 times
const checkUserAttempt = () => {
    return false;
}

const decodeBlockPrompt = (blockPrompt) => {
    // for simplicity, we use base64 encoding to store the prompt in the blockchain
    // later lets encrypt the prompt with the private key
    return Buffer.from(blockPrompt, "base64").toString("utf-8");
}

const encodePrompt = (prompt) => {
    return Buffer.from(prompt).toString("base64");
}


const getPromptFromBlockchain = async (contractId) => {
    try {
        const nearConnection = await connectToNear();
        const account = await nearConnection.account(contractId);

        const contract = new Contract(account, contractId, {
            viewMethods: ["nft_prompt"],
        });

        return await contract.nft_prompt();
    } catch (error) {
        console.error(error);
        return { error: error };
    }
};


const viewPrompt = async (req, res) => {
    try {
        const prompt = await getPromptFromBlockchain(contractId);
        return res.status(200).json({ prompt: prompt, decodedPrompt: decodeBlockPrompt(prompt) });
    } catch (error) {
        return res.status(500).json({
            message: "Problem while fetching prompt from blockchain. Please try again."
        });
    }

}

const createImage = async (req, res) => {
    try {

        const prompt = req.body.prompt;

        const blockPrompt = await getPromptFromBlockchain(contractId);
        const decodedBlockPrompt = decodeBlockPrompt(blockPrompt);
        const newPrompt = decodedBlockPrompt + " " + prompt;
        const newPromptEncoded = encodePrompt(newPrompt);

        // return res.status(201).json({
        //     url: "https://corcel.b-cdn.net/1ff3778a-e3a7-47ad-af83-fe777f57a4a9.webp",
        //     prompt: prompt,
        //     encodedPrompt: newPromptEncoded,
        //     alt: ""
        // });

        if (!validateInput(prompt)) {
            return res.status(400).json({ message: "Invalid input. Prompt should be between 1 and 21 characters." });
        }

        if (checkUserAttempt()) {
            return res.status(400).json({ message: "You have already tried to generate an image. Please try again later." });
        }

        const output = await corcelTextToImage(newPrompt);

        return res.status(201).json({
            url: output[0].image_url,
            prompt: prompt,
            encodedPrompt: newPromptEncoded,
            alt: ""
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Problem while generating image from prompt. Please try again."
        });
    }

}

const mintImage = async (req, res) => {


}

export default {
    createImage,
    viewPrompt
}
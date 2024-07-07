import fetch from 'node-fetch';

const url = 'https://api.corcel.io/v1/image/cortext/text-to-image';
const authozationToken = process.env.CORCEL_AUTH_TOKEN;

const corcelTextToImage = async (prompt) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: authozationToken
        },
        body: JSON.stringify({
            messages: prompt,
            model: 'cortext-image',
            size: '1024x1024',
            quality: 'standard',
            provider: 'OpenAI',
            steps: 30,
            cfg_scale: 8
        })
    };

    // fetch(url, options)
    //     .then(res => res.json())
    //     .then(json => console.log(json))
    //     .catch(err => console.error('error:' + err));

    // TODO error handling
    const resp = await fetch(url, options);
    const data = await resp.json();

    return data;
}

export {
    corcelTextToImage
}

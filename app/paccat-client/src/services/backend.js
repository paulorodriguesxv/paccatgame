import axios from "axios";

/*
const getNFTImage = async(imageURI) => {
    const res = await axios(imageURI);

    if (res.status !== 200){
        throw new Error('It was not possible to request NFT Image')
    }   
    
    return res.data
}
*/

export const getNFTImageURI = async (tokenURI) =>  {

    const res = await axios.get(tokenURI);

    if (res.status !== 200){
        throw new Error('It was not possible to request NFT metada')
    }

    const metadata = await res.data

    return metadata.image
}
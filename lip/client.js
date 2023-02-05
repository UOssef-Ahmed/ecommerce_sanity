import SanityClient  from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const client=SanityClient({
    projectId:'x4mdynq2',
    dataset:'production',
    apiVersion:'2022-11-25',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN
});



export const urlFor=(sourse)=>imageUrlBuilder(client).image(sourse)

// ^^ short cut
// const builder=imageUrlBuilder(client)
// export const urlFor=(sourse)=>builder.image(sourse)


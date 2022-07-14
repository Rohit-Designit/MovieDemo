import sanityClient from '@sanity/client';

export default sanityClient({
    projectId:"7wv5omzr",
    dataset:"production", 
    useCdn: true
})
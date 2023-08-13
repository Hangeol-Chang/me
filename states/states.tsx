import { atom } from 'recoil';

const prefixState = atom<string>({
    key : 'prefixState',
    default : process.env.NODE_ENV === "production"
        ? `https://hangeol-chang.github.io/me` 
        : "", 
})

const relativePrefixState = atom<string>({
    key : 'relativePrefixState',
    default : process.env.NODE_ENV === "production"
        ? `/me`
        : `/`,
})

export {
    prefixState,
    relativePrefixState,
};
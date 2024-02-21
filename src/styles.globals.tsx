import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root{
        font-family: "Quicksand", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;

        --wd-inkyblue-4-dark: rgba(29, 50, 70, 1);
        --wd-inkyblue-8-dark: rgba(50, 75, 99, 1);
        --wd-inkyblue-12-dark: rgba(83, 105, 128, 1);
        --wd-inkyblue-12-10op-dark: rgba(83, 105, 128, 0.1);
        --wd-inkyblue-12-60op-dark: rgba(83, 105, 128, 0.6);
        --wd-inkyblue-12-80op-dark: rgba(83, 105, 128, 0.8);
        --wd-almostwhite-12-dark: rgba(240, 240, 240, 1);
        --wd-midnightyellow-4-dark: rgba(255, 184, 0, 1);
        --wd-strangepurple-24-dark: rgba(170, 185, 255, 1);
        --wd-almostgray-24-dark: rgba(155, 177, 200, 1)

        --wd-shygray-20-10op-light: rgba(217, 226, 235, 0.1);
        --wd-shygray-20-25op-light: rgba(217, 226, 235, 0.25);
        --wd-shygray-20-60op-light: rgba(217, 226, 235, 0.6);
        --wd-shygray-20-80op-light: rgba(217, 226, 235, 0.8);
        --wd-shygray-20-light: rgba(217, 226, 235, 1);
        --wd-shygray-24-light: rgba(248, 250, 252, 1);
        --wd-brightyellow-4-light: rgba(255, 164, 28, 1);
        --wd-boldgray-4-light: rgba(61, 70, 80, 1);
        --wd-boldgray-4-80op-light: rgba(61, 70, 80, 0.8);
        --wd-strangepurple-4-light: rgba(68, 101, 254, 1);

        background-color: ${(props) => props.theme.bg};
        color: ${(props) => props.theme.primaryTextColor};

    }

    @media only screen and (max-width: 768px){
        html,body, #root {
            height: 100%;
        }

        #root{
            display: flex;
        }
    }
`;

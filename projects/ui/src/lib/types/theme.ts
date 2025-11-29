import { ColorVariant } from "./color";

export type Theme = {
    colors: { [key in ColorVariant]: string };
};


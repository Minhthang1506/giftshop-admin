export const CapitalizeFirstLetter = (string) => {
    if (string) {

        const words = string.split(" ");

        return words
            .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
    } else return string;
};

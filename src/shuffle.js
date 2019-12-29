export default function randomize(array) {
    const randomized = [];

    while (array.length) {
        const randomIndex = getRandomIntLessThan(array.length);
        randomized.push(array[randomIndex]);

        array = [
            ...array.slice(0, randomIndex),
            ...array.slice(randomIndex + 1),
        ];
    }

    return randomized;
}

function getRandomIntLessThan(x) {
    return Math.floor(Math.random() * Math.floor(x));
}

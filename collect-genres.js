const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const csvWriter = require('csv-writer').createObjectCsvWriter;

// Function to extract genres from front matter
function extractGenres(frontMatter) {
    const genres = frontMatter.genres || [];
    return genres;
}

// Function to read .md files in a directory
function readFilesInDirectory(directory) {
    return fs.readdirSync(directory)
        .filter(file => path.extname(file) === '.md')
        .map(file => path.join(directory, file));
}

// Function to parse front matter from a file
function parseFrontMatter(file) {
    const data = fs.readFileSync(file, 'utf8');
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n/;
    const match = frontMatterRegex.exec(data);
    if (match && match[1]) {
        return yaml.load(match[1]);
    } else {
        return {};
    }
}

// Main function to collect genres, sort, remove duplicates, and save to CSV
function collectGenresAsJson(directory) {

    const files = readFilesInDirectory(directory);
    let allGenres = [];

    files.forEach(file => {
        const frontMatter = parseFrontMatter(file);
        const genres = extractGenres(frontMatter);
        genres.split(',').forEach(genre => {
            if (genre.trim() !== '') {
                allGenres.push(genre.trim());
            }
        })
    });

    // Remove duplicates and sort genres alphabetically
    const uniqueSortedGenres = [...new Set(allGenres)].sort((a, b) => a.localeCompare(b));
    return uniqueSortedGenres;


}

// Example usage
const directory = './content/albums';
const jsonOutputFile = 'genres.json';
const genresArray = collectGenresAsJson(directory);

fs.writeFileSync(jsonOutputFile, JSON.stringify(genresArray, null, 2));


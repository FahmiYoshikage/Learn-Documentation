const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DOCS_DIR = path.join(__dirname, '..');

// Helper to get directories that probably contain docs
const getDirectories = (srcPath) => {
    return fs.readdirSync(srcPath).filter((file) => {
        if (
            file === 'node_modules' ||
            file === '.git' ||
            file === '.vitepress' ||
            file === 'connector' ||
            file === 'public'
        ) {
            return false;
        }
        return fs.statSync(path.join(srcPath, file)).isDirectory();
    });
};

// Helper to get MD files in a directory
const getMarkdownFiles = (dir) => {
    try {
        const fullPath = path.join(DOCS_DIR, dir);
        return fs.readdirSync(fullPath).filter((file) => file.endsWith('.md'));
    } catch (e) {
        return [];
    }
};

app.get('/api/structure', (req, res) => {
    const dirs = getDirectories(DOCS_DIR);
    const structure = {};

    // root files
    structure['root'] = getMarkdownFiles('');

    dirs.forEach((dir) => {
        structure[dir] = getMarkdownFiles(dir);
    });

    res.json(structure);
});

app.post('/api/file', (req, res) => {
    let { folder, filename, content } = req.body;

    if (folder === 'root' || !folder) {
        folder = '';
    }

    if (!filename.endsWith('.md')) {
        filename += '.md';
    }

    const folderPath = path.join(DOCS_DIR, folder);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.join(folderPath, filename);
    fs.writeFileSync(filePath, content || '');

    // Pull and commit can be done here but let's assume it's just saved
    res.json({ success: true, message: 'File saved successfully' });
});

app.get('/api/file', (req, res) => {
    let { folder, filename } = req.query;
    if (folder === 'root' || !folder) folder = '';
    const filePath = path.join(DOCS_DIR, folder, filename);

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        res.json({ content });
    } catch (e) {
        res.status(404).json({ error: 'File not found' });
    }
});

app.post('/api/sync', (req, res) => {
    exec('git pull', { cwd: DOCS_DIR }, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).json({ error: stderr });
        }
        res.json({ message: stdout });
    });
});

const PORT = 3001;
app.listen(PORT, () =>
    console.log(`Connector running on http://localhost:${PORT}`)
);

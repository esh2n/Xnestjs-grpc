"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefixDisableLinter = exports.maybeAddComment = exports.upperFirst = exports.lowerFirst = exports.singular = exports.fail = exports.readToBuffer = void 0;
const ts_poet_1 = require("ts-poet");
function readToBuffer(stream) {
    return new Promise((resolve) => {
        const ret = [];
        let len = 0;
        stream.on('readable', () => {
            let chunk;
            while ((chunk = stream.read())) {
                ret.push(chunk);
                len += chunk.length;
            }
        });
        stream.on('end', () => {
            resolve(Buffer.concat(ret, len));
        });
    });
}
exports.readToBuffer = readToBuffer;
function fail(message) {
    throw new Error(message);
}
exports.fail = fail;
function singular(name) {
    return name.substring(0, name.length - 1); // drop the 's', which is extremely naive
}
exports.singular = singular;
function lowerFirst(name) {
    return name.substring(0, 1).toLowerCase() + name.substring(1);
}
exports.lowerFirst = lowerFirst;
function upperFirst(name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
}
exports.upperFirst = upperFirst;
// Since we don't know what form the comment originally took, it may contain closing block comments.
const CloseComment = /\*\//g;
/** Removes potentially harmful characters from comments and pushes it into chunks. */
function maybeAddComment(desc, chunks, deprecated, prefix = '') {
    let lines = [];
    if (desc.leadingComments || desc.trailingComments) {
        let content = (desc.leadingComments || desc.trailingComments || '').replace(CloseComment, '* /').trim();
        // Detect /** ... */ comments
        const isDoubleStar = content.startsWith('*');
        if (isDoubleStar) {
            content = content.substring(1).trim();
        }
        // Prefix things like the enum name.
        if (prefix) {
            content = prefix + content;
        }
        lines = content.split('\n').map((l) => l.replace(/^ /, '').replace(/\n/, ''));
    }
    // Deprecated comment should be added even if no other comment was added
    if (deprecated) {
        if (lines.length > 0) {
            lines.push('');
        }
        lines.push('@deprecated');
    }
    let comment;
    if (lines.length === 1) {
        comment = ts_poet_1.code `/** ${lines[0]} */`;
    }
    else {
        comment = ts_poet_1.code `/**\n * ${lines.join('\n * ')}\n */`;
    }
    if (lines.length > 0) {
        chunks.push(ts_poet_1.code `\n\n${comment}\n\n`);
    }
}
exports.maybeAddComment = maybeAddComment;
// Comment block at the top of every source file, since these comments require specific
// syntax incompatible with ts-poet, we will hard-code the string and prepend to the
// generator output.
function prefixDisableLinter(spec) {
    return `/* eslint-disable */\n${spec}`;
}
exports.prefixDisableLinter = prefixDisableLinter;

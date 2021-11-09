import { webcrypto } from 'crypto';

// @ts-ignore: Node types aren't up-to-date with webcrypto properties.
global.crypto = webcrypto;

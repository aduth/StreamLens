import { webcrypto } from 'crypto';
import chai from 'chai';
import sinonChai from 'sinon-chai';

// @ts-ignore: Node types aren't up-to-date with webcrypto properties.
globalThis.crypto = webcrypto;

chai.use(sinonChai);

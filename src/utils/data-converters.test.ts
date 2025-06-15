import { bytesToHumanReadableSize } from './data-converters'

describe('bytesToHumanReadableSize', () => {
    it('should convert 0 bytes to "0 B"', () => {
        expect(bytesToHumanReadableSize(0)).toBe('0 B');
    });

    it('should convert 1023 bytes to "1023 B"', () => {
        expect(bytesToHumanReadableSize(1023)).toBe('1023 B');
    });

    it('should convert 1024 bytes to "1 kB"', () => {
        expect(bytesToHumanReadableSize(1024)).toBe('1 kB');
    });

    it('should convert 2048 bytes to "2 kB"', () => {
        expect(bytesToHumanReadableSize(2048)).toBe('2 kB');
    });

    it('should convert 1048576 bytes to "1 MB"', () => {
        expect(bytesToHumanReadableSize(1048576)).toBe('1 MB');
    });

    it('should convert 1073741824 bytes to "1 GB"', () => {
        expect(bytesToHumanReadableSize(1073741824)).toBe('1 GB');
    });

    it('should convert 1099511627776 bytes to "1 TB"', () => {
        expect(bytesToHumanReadableSize(1099511627776)).toBe('1 TB');
    });
});
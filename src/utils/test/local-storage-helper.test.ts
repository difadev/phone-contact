import '@testing-library/jest-dom';
import {loadFromLocalStorage, saveToLocalStorage, clearLocalStorage} from '../local-storage-helper'
import { act } from "react-dom/test-utils";

describe('Report Null', () => {
    it('Load From Local Storage', function () {
        act(() => {
            saveToLocalStorage('tes', 'tes')
        })
        const datas = loadFromLocalStorage('tes');
        expect(datas).toEqual('tes')
    })
    it('Clear Local Storage', function () {
        const datas = clearLocalStorage('tes');
        expect(datas).toEqual(undefined)
    })
})
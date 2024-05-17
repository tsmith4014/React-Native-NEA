import { LoadingPropTypes } from '@/components/Loading';
import { StateCreator } from 'zustand';

export interface LoadingSlice {
    loading: LoadingPropTypes;
    startLoading: (loading?: LoadingPropTypes) => void;
    stopLoading: (callback?: () => void) => void;
}

const loadingSlice: StateCreator<LoadingSlice> = (set) => ({
    loading: {},
    startLoading: (loading = {}) => set({ loading: { ...loading, visible: true } }),
    stopLoading: (callback) => {
        set({ loading: {} });
        setTimeout(() => {
            callback && callback();
        }, 100);
    },
});

export default loadingSlice;

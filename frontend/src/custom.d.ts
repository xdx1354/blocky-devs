declare namespace JSX {
    interface IntrinsicElements {
        'w3m-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            label?: string;
            size?: 'md' | 'sm';
            disabled?: boolean;
            balance?: 'show' | 'hide';
            loadingLabel?: string;
        };
    }
}
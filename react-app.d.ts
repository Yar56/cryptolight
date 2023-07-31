declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.module.css';
declare module '*.module.scss';

declare module '*.png';

interface FunctionComponent<P = Record<string, unknown>> {
    (props: P, context?: unknown): ReactElement<unknown, unknown> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<unknown> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}

type Reducer<State, Action> = (state: State, action: Action) => State;

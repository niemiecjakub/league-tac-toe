import { LoadingIcon } from "../svg/svg-icons";

export interface LoadingProps {
    text: string;
}

function Loading({ text }: LoadingProps) {
    return (
        <div className="flex flex-col items-center justify-end">
            <LoadingIcon className="animate-bounce" />
            <h1 className="text-3xl">{text}</h1>
        </div>
    );
}

export default Loading;

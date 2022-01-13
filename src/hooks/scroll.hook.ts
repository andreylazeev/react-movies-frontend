import {RefObject, useEffect, useRef} from "react";

export default function useScroll(childRef: RefObject<HTMLElement>, callback: ()=>void) {
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        }
        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                callback()
            }
        }, options)

        observer.current.observe(childRef.current as HTMLElement)

        return function () {
            observer.current!.unobserve(childRef!.current as Element)
        };
    }, [callback])
};
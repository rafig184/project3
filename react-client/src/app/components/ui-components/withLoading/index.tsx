import { Loader } from "../loader"
export function WithLoading(props: { isLoading: boolean, children: any }) {
    return props.isLoading ? <Loader /> : props.children
}
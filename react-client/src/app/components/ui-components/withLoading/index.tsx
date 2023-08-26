import { ProgressSpinner } from 'primereact/progressspinner';
export function WithLoading(props: { isLoading: boolean, children: any }) {
    return props.isLoading ? <ProgressSpinner /> : props.children
}




// import { Loader } from "../loader"
// export function WithLoading(props: { isLoading: boolean, children: any }) {
//     return props.isLoading ? <Loader /> : props.children
// }


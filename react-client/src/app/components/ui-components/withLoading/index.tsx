import { ProgressSpinner } from 'primereact/progressspinner';
import { Skeleton } from 'primereact/skeleton';

export function WithLoading(props: { isLoading: boolean, children: any }) {
    return props.isLoading ? <div>
        <Skeleton className="mb-2"></Skeleton>
        <Skeleton width="20rem" height="6rem"></Skeleton>
        <div style={{ marginBottom: "2%" }}></div>
        <Skeleton width="20rem" className="mb-2"></Skeleton>
        <Skeleton width="20rem" className="mb-2"></Skeleton>
        <Skeleton width="8rem" className="mb-2"></Skeleton>
        <Skeleton width="8rem" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2"></Skeleton>
        <Skeleton width="20rem" height="6rem"></Skeleton>
        <div style={{ marginBottom: "2%" }}></div>
        <Skeleton width="7rem" height="5rem"></Skeleton>
    </div> : props.children
}


export function WithLoadingSpinner(props: { isLoading: boolean, children: any }) {
    return props.isLoading ? <ProgressSpinner /> : props.children
}




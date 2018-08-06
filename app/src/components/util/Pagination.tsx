import { Button, ButtonGroup, Intent } from "@blueprintjs/core";
import * as React from "react";

interface Props {
    currentPage: number;
    pageCount: number;
    pagesShown: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.SFC<Props> = (props: Props) => {
    const { currentPage, pageCount, onPageChange } = props;
    let { pagesShown } = props;
    if (pageCount < pagesShown) {
        pagesShown = pageCount + 1;
    }

    const mid = Math.floor(pagesShown / 2);
    let offset = mid;
    if (currentPage < mid) {
        offset = currentPage;
    }
    if (currentPage > pageCount - mid) {
        let diff = mid - (pageCount - currentPage);
        if (pagesShown % 2 === 0) {
            diff -= 1;
        }
        offset += diff;
    }

    const pages = Array.from(new Array(pagesShown))
        .map((_, i) => currentPage + i - offset)
        .filter(v => v <= pageCount);

    const renderPage = (page: number) => {
        return (
            <Button
                key={page}
                intent={currentPage === page ? Intent.PRIMARY : Intent.NONE}
                onClick={() => onPageChange(page)}
            >
                {page + 1}
            </Button>
        );
    };

    const renderLastPage = () => {
        if (pages.indexOf(pageCount) !== -1 || currentPage > pageCount - offset) {
            return null;
        }

        return (
            <>
                <Button disabled={true}>...</Button>
                {renderPage(pageCount)}
            </>
        );
    };

    const renderFirstPage = () => {
        if (pagesShown > pageCount) {
            return null;
        }

        return (
            <ButtonGroup style={{ marginRight: "10px" }}>
                <Button icon="double-chevron-left" onClick={() => onPageChange(0)} disabled={currentPage === 0}>
                    First
                </Button>
            </ButtonGroup>
        );
    };

    return (
        <>
            {renderFirstPage()}
            <ButtonGroup>
                <Button
                    icon="chevron-left"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                />
                <Button
                    icon="chevron-right"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                >
                    Next
                </Button>
                {pages.map(renderPage)}
                {renderLastPage()}
            </ButtonGroup>
        </>
    );
};

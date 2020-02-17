import * as React from 'react';
import "./index.css";

interface PageContentEmptyProps {
    className?: string;
    description?: string;
}

export const PageContentEmpty = React.memo((props: PageContentEmptyProps) => {
    const { description } = props;

    return (
        <div className='hsl-message-list--empty-container page-content-empty' >
            <div className='helper-middle-container'>
                <div className='helper-middle'>
                    <div className="icon-empty-page-container">
                        <div className="icon-empty-page-item">
                            <div className="icon-empty-page-item-avatar"></div>
                            <div className="icon-empty-page-item-list">
                                <div className="icon-empty-page-item-list-item"></div>
                                <div className="icon-empty-page-item-list-item"></div>
                                <div className="icon-empty-page-item-list-item"></div>
                            </div>
                        </div>
                        <div className="icon-empty-page-item">
                            <div className="icon-empty-page-item-avatar"></div>
                            <div className="icon-empty-page-item-list">
                                <div className="icon-empty-page-item-list-item"></div>
                                <div className="icon-empty-page-item-list-item"></div>
                                <div className="icon-empty-page-item-list-item"></div>
                            </div>
                        </div>
                        <div className="icon-empty-page-item">
                            <div className="icon-empty-page-item-avatar"></div>
                            <div className="icon-empty-page-item-list">
                                <div className="icon-empty-page-item-list-item"></div>
                                <div className="icon-empty-page-item-list-item"></div>
                                <div className="icon-empty-page-item-list-item"></div>
                            </div>
                        </div>
                        <div className="icon-empty-page-item">
                            <div className="icon-empty-page-item-avatar"></div>
                            <div className="icon-empty-page-item-list">
                                <div className="icon-empty-page-item-list-item"></div>
                                <div className="icon-empty-page-item-list-item"></div>
                                <div className="icon-empty-page-item-list-item"></div>
                            </div>
                        </div>
                    </div>
                    <span className="description-empty">{description}</span>
                </div>
            </div>
        </div>
    )
})
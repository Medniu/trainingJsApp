import React, {useState, useEffect} from 'react';
const Item = ({name,picture, price}) => {

    return (
        <div className ="item-container">
            <div>
                {name}
            </div>

            <div className ="item-image-container">
                <img src={picture} className="image-container" />
            </div>
            <div className="item-info-container">
                <div>
                    {price}
                </div>
                <div>
                    <button>
                        buy
                    </button>
                </div>
            </div>
        </div>
    );

}

module.exports = Item;
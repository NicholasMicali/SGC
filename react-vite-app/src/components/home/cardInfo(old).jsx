import React from "react";

const CardInfo = () => {
    return (
        <>
            <style>{`
                .card-stats {
                    align-items: flex-start;
                    background: conic-gradient(
                        from 390deg at 101% 50%,
                        rgba(253, 59, 138, 1) 100.73deg,
                        rgba(72, 184, 230, 1) 330.31deg,
                        rgba(153, 101, 248, 0.5) 130.31deg
                    );
                    background-color: rgba(255, 255, 255, 1);
                    display: flex;
                    justify-content: space-between;
                    min-height: 79px;
                    min-width: 1064px;
                    padding: 16px 60px;
                    position: relative;
                    width: 100%;
                }
                .card-stats .col {
                    align-items: center;
                    display: inline-flex;
                    flex: 0 0 auto;
                    flex-direction: column;
                    gap: 8px;
                    position: relative;
                }
                .card-stats .text-wrapper {
                    color: rgba(0, 0, 0, 1);
                    font-family: "Poppins", Helvetica;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 600;
                    letter-spacing: 0px;
                    line-height: 21.6px;
                    margin-top: -1px;
                    position: relative;
                    white-space: nowrap;
                    width: fit-content;
                }
                .card-stats .div {
                    color: rgba(56, 63, 66, 1);
                    font-family: "Poppins", Helvetica;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    letter-spacing: 0px;
                    line-height: 17px;
                    position: relative;
                    white-space: nowrap;
                    width: fit-content;
                }
            `}</style>
            <div className="card-stats">
                <div className="col">
                    <div className="text-wrapper">Hero-2</div>
                    <div className="div">Card Name</div>
                </div>
                <div className="col">
                    <div className="text-wrapper">14</div>
                    <div className="div">Location 📍</div>
                </div>
                <div className="col">
                    <div className="text-wrapper">260 miles</div>
                    <div className="div">The most far location</div>
                </div>
                <div className="col">
                    <div className="text-wrapper">15</div>
                    <div className="div">People</div>
                </div>
            </div>
        </>
    );
};

export default CardInfo;
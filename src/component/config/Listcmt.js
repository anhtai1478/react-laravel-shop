import React from 'react';


function Listcmt({ listCmt, handleReply }) {

    const filterID = listCmt.filter(cmt => cmt.id_comment === 0)

    return (
        <div className="response-area">
            <h2>{listCmt.length} RESPONSES</h2>

            <ul className="media-list">
                {filterID.map((cmt) => (
                    
                    <div key={cmt.id}>

                        
                        <li className="media" style={{ textAlign: "left" }}>
                            <a className="pull-left" href="#">
                                <img
                                    className="media-object"
                                    src={cmt.image_user ? `http://localhost/laravel8/laravel8/laravel8/public/upload/user/avatar/${cmt.image_user}` : "images/blog/man-two.jpg"}
                                    alt={cmt.name_user || "User Avatar"}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                />
                            </a>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i> {cmt.name_user}</li>
                                    <li><i className="fa fa-clock-o"></i> {cmt.time || "2:33 pm"}</li>
                                    <li><i className="fa fa-calendar"></i> {cmt.date || "DEC 5, 2013"}</li>
                                </ul>
                                <p>{cmt.comment}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleReply && handleReply(cmt.id)}
                                >
                                    <i className="fa fa-reply"></i> Reply
                                </button>
                            </div>
                        </li>


                        {listCmt
                            .filter(reply => String(reply.id_comment) === String(cmt.id))
                            .map((reply) => (
                                <li className="media" key={reply.id} style={{width: "650px", marginLeft:"27px" , paddingLeft: '80px', textAlign: "left" }}>
                                    <a className="pull-left" href="#">
                                        <img
                                            className="media-object"
                                            src={reply.image_user ? `http://localhost/laravel8/laravel8/laravel8/public/upload/user/avatar/${reply.image_user}` : "images/blog/man-two.jpg"}
                                            alt={reply.name_user || "User Avatar"}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        />
                                    </a>
                                    <div className="media-body">
                                        <ul className="sinlge-post-meta">
                                            <li><i className="fa fa-user"></i> {reply.name_user}</li>
                                            <li><i className="fa fa-clock-o"></i> {reply.time || "Vừa xong"}</li>
                                            <li><i className="fa fa-calendar"></i> {reply.date || "DEC 5, 2013"}</li>
                                        </ul>
                                        <p>{reply.comment}</p>

                                    </div>
                                </li>
                            ))
                        }

                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Listcmt;
import React, { useState } from 'react';


const TaskCard = (props) => {
    const [user, _] = useState(props.user);
    return (
        <div>
            <div className="card mb-4">
                <header className="card-header">
                    <p className="card-header-title">
                        {user.username}
                    </p>
                </header>
                <div className="panel">
                    {user.tasks.map((task) => {
                        return (

                            <div className="panel-block">
                                <span className="panel-icon">
                                    {task.done ? <i className="far fa-check-square has-text-success"></i> : <i className="far fa-square"></i>}

                                </span>
                                {task.title}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TaskCard

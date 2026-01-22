import "./UserList.css";

function UserList({ users, selectedUser, onSelectUser }) {
    return (
        <div className="user-list">
            {users.map((user) => (
                <div
                    key={user._id}
                    className={`user-item ${selectedUser?._id === user._id ? "active" : ""}`}
                    onClick={() => onSelectUser(user)}
                >
                    <div className="user-avatar">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <div className="user-name">{user.username}</div>
                        <div className="user-email">{user.email}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserList;

import pool from "../config/database.js";
import { hashRefreshToken } from "../utils/hashRefreshToken.js";
export const existingUser = async (email) => {
    const result = await pool.query(`SELECT * FROM USERS WHERE email =$1`, [email]);
    return result.rows[0];
};
export const createUser = async (newuser) => {
    try {
        const result = await pool.query(`INSERT INTO USERS(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email,role`, [newuser.name, newuser.email, newuser.password]);
        return result.rows[0];
    }
    catch (error) {
        if (typeof error === "object" && error !== null) {
            if ("code" in error && error.code === "23505" && "constraint" in error) {
                throw {
                    code: error.code,
                    constraint: error.constraint
                };
            }
        }
        throw error;
    }
};
export const getUserProfile = async (userID) => {
    const result = await pool.query(`SELECT ID,NAME,EMAIL,ROLE FROM USERS WHERE ID =$1`, [userID]);
    return result.rows[0];
};
export const userDeletion = async (userID) => {
    const result = await pool.query(`DELETE FROM USERS WHERE ID = $1`, [userID]);
    return result.rowCount;
};
export const refreshUser = async (user) => {
    await pool.query(`INSERT INTO refresh_tokens(user_id,token,expires_at) VALUES($1,$2,$3)`, [user.user_id, hashRefreshToken(user.token), user.expires_at]);
};
export const userDataFromRefresh = async (token) => {
    const hashedToken = hashRefreshToken(token);
    const result = await pool.query(`SELECT *FROM refresh_tokens WHERE token = $1`, [hashedToken]);
    return result.rows[0];
};
export const revocationToken = async (token) => {
    const hashedToken = hashRefreshToken(token);
    await pool.query(`UPDATE refresh_tokens
             SET revoked = TRUE
             WHERE token = $1 `, [hashedToken]);
};
export const revocationTokenAll = async (user_id) => {
    await pool.query(`UPDATE refresh_tokens
            SET revoked = TRUE
            where user_id = $1 AND revoked = FALSE`, [user_id]);
};
export const deleteExpiredRefreshTokens = async () => {
    await pool.query(`DELETE FROM refresh_tokens
            WHERE expires_at < NOW() `);
};
//# sourceMappingURL=auth.repository.js.map
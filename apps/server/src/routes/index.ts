import express from "express";
import {
    getAuth,
    signInWithGoogle,
    signInWithGoogleFailed,
    signInWithGoogleRedirect,
    signInWithGoogleSuccess
} from "../controllers";
const router = express.Router();
/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Retrieve the current user
 *     description: Retrieve the user details by decoding the cookie
 *     responses:
 *       200:
 *         description: User details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 */
router.get('/api/auth', getAuth);

router.get('/api/oauth2/google', signInWithGoogle());
router.get('/api/oauth2/google/redirect', signInWithGoogleRedirect());
router.get('/api/oauth2/google/success', signInWithGoogleSuccess);
router.get('/api/oauth2/google/failed', signInWithGoogleFailed);


export default router;
import express from "express";
import {
    getAuth,
    getCodeByUserId,
    postCode,
    signInWithGoogle,
    signInWithGoogleFailed,
    signInWithGoogleRedirect,
    signInWithGoogleSuccess,
    updateCode,
    getCodeById,
    runCode,
    logout
} from "../controllers";
import { requireAuth } from "../middlewares/requireAuth";
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
router.get('/auth', getAuth)
/**
 * @swagger
 * /api/auth:
 *   delete:
 *     summary: Logout the current user
 *     description: Logout the currently authenticated user
 *     responses:
 *       204:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized - user not authenticated
 *       500:
 *         description: Internal server error
 */
router.delete('/auth', logout);
/**
 * @swagger
 * /api/oauth2/google:
 *   get:
 *     summary: Initiate Google OAuth2 authentication
 *     description: Redirects the user to Google for authentication
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth2 authentication page
 */
router.get('/oauth2/google', signInWithGoogle());
/**
 * @swagger
 * /api/oauth2/google/redirect:
 *   get:
 *     summary: Callback endpoint for Google OAuth2 authentication
 *     description: Callback URL to handle redirection from Google after authentication
 *     responses:
 *       302:
 *         description: Redirects to the appropriate success or failure URL
*/
router.get('/oauth2/google/redirect', signInWithGoogleRedirect());
/**
 * @swagger
 * /api/oauth2/google/success:
 *   get:
 *     summary: Successful Google OAuth2 authentication
 *     description: Redirects to this URL after successful authentication with Google
 *     responses:
 *       200:
 *         description: Success
*/
router.get('/oauth2/google/success', signInWithGoogleSuccess);
/**
 * @swagger
 * /api/oauth2/google/failed:
 *   get:
 *     summary: Failed Google OAuth2 authentication
 *     description: Redirects to this URL after failed authentication with Google
 *     responses:
 *       200:
 *         description: Failure
*/
router.get('/oauth2/google/failed', signInWithGoogleFailed);
/**
 * @swagger
 * /api/code:
 *   get:
 *     summary: Retrieve the users saved code
 *     description: Retrieve the users saved code
 *     responses:
 *       200:
 *         description: Saved Code
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   userRef:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/code', requireAuth, getCodeByUserId);
/**
 * @swagger
 * /api/code:
 *   post:
 *     summary: Save code
 *     description: Save code with specified title, content, and user reference
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */
router.post('/code', requireAuth, postCode);
/**
 * @swagger
 * /api/code/{id}:
 *   put:
 *     summary: Update code
 *     description: Update existing code with specified ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */
router.put('/code', requireAuth, updateCode);
/**
 * @swagger
 * /api/code/{id}:
 *   get:
 *     summary: Get code by ID
 *     description: Retrieves code by its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Code found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 * 
 */
router.get('/code/:id', requireAuth, getCodeById);
/**
 * @swagger
 * /api/run-code:
 *   post:
 *     summary: Run code
 *     description: Executes the provided code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Execution successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/run-code', requireAuth, runCode);

export default router;
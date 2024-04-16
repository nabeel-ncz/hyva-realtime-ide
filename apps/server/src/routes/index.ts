import express from "express";
import {
    getAuth,
    getCodeByUserId,
    postCode,
    signInWithGoogle,
    signInWithGoogleFailed,
    signInWithGoogleRedirect,
    signInWithGoogleSuccess,
    updateCode
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
router.get('/api/auth', getAuth);

router.get('/api/oauth2/google', signInWithGoogle());
router.get('/api/oauth2/google/redirect', signInWithGoogleRedirect());
router.get('/api/oauth2/google/success', signInWithGoogleSuccess);
router.get('/api/oauth2/google/failed', signInWithGoogleFailed);

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
router.get('/api/code', requireAuth, getCodeByUserId);
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
router.post('/api/code', requireAuth, postCode);
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
router.put('/api/code', requireAuth, updateCode);


export default router;
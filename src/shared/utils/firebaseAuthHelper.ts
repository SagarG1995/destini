/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppleAuthProvider, createUserWithEmailAndPassword, EmailAuthProvider, getAuth, GoogleAuthProvider, linkWithCredential, signInWithCredential, signInWithEmailAndPassword } from "@react-native-firebase/auth";
import appleAuth from '@invertase/react-native-apple-authentication'
import { GoogleSignin, isSuccessResponse } from "@react-native-google-signin/google-signin";
import { showToast } from "./toast";

export const auth = getAuth();

/**
 * Sign up with email + password
 */
export const signUpWithEmail = async (email: string, password: string) => {
    try {

        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCred.user };

    } catch (error: any) {

        if (error?.code === "auth/email-already-in-use" || error?.code === "auth/unknown") {
            const linkingResponse = await linkEmailToGoogleUser(email, password)
            console.log('linkingResponse : ', linkingResponse);
            return linkingResponse

        } else {
            return { success: false, error, code: error?.code };
        }

    }
};

/**
 * Sign in with email + password
 */
export const signInWithEmail = async (email: string, password: string) => {
    try {

        const userCred = await signInWithEmailAndPassword(auth, email, password);

        return { success: true, user: userCred.user };
    } catch (error: any) {
        if (error?.code === 'auth/invalid-credential') {
            const signUpRes = await signUpWithEmail(email, password)
            return signUpRes
        } else {
            return { success: false, error, code: error?.code };
        }
    }
};


/**
 * Sign in with Google
 * Handles linking if email already exists via password signup
 */
export const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResponse = await GoogleSignin.signIn();
        if (isSuccessResponse(signInResponse)) {
            const googleCredential = GoogleAuthProvider.credential(signInResponse?.data?.idToken);
            const userCred = await signInWithCredential(auth, googleCredential);
            return { success: true, user: userCred.user, idToken: signInResponse?.data?.idToken };
        } else {
            return { success: false, error: signInResponse }
        }
    } catch (error: any) {
        return { success: false, error, code: error?.code };
    }
};

/**
 * Sign in with APPLE
 */
export const signinWithApple = async () => {
    try {

        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        if (!appleAuthRequestResponse.identityToken) {
            showToast('Apple Sign-In failed - no identify token returned');
            return { success: false, error: 'No Identify Token Returned' };
        }

        const { identityToken, nonce, fullName } = appleAuthRequestResponse;
        const appleCredential = AppleAuthProvider.credential(identityToken, nonce);

        const userCred = await signInWithCredential(auth, appleCredential)
        return { success: true, user: userCred.user, idToken: identityToken };

    } catch (error: any) {
        return { success: false, error, code: error?.code };
    }
};

/**
 * Helper: link email/password to a Google account (for reverse case)
 * Call this when user logged in with Google and wants to add a password login
 */
export const linkEmailToGoogleUser = async (email: string, password: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return { success: false, error: 'No user logged in' };

    try {
        const emailCred = EmailAuthProvider.credential(email, password);
        const linked = await linkWithCredential(currentUser, emailCred);
        return { success: true, user: linked.user };
    } catch (error: any) {
        return { success: false, error, code: error?.code };
    }
};
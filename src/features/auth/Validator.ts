export const validateEmail = (email: string) => {
    if (!email) return 'Email cannot be blank'
    else if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter valid email'
    else return true
}

export const validatePassword = (password: string) => {
    if (!password || password.length < 5) {
        return 'Password must be at least 5 characters long.';
    }

    else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        return 'Password must include both lowercase and uppercase letters.';
    }

    else if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return 'Password must include at least one number or special character.';
    }

    else return true
}
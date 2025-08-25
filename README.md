Got it 👍 You can sign in to GitHub directly from the GitHub CLI (gh) — it’s much easier than messing with tokens manually.

🛠 Install GitHub CLI (if not installed)

On macOS, run:

brew install gh

🔑 Sign in with the CLI

Once installed, just run:

gh auth login

It will walk you through these steps:

Choose GitHub.com (or GitHub Enterprise if you use work’s GitHub server).

Choose HTTPS (recommended).

When asked about authentication:

Select “Login with a web browser”.

It will give you a one-time code.

Open the link it shows, paste the code, and approve.

Done ✅

✅ Verify login

Check which account is signed in:

gh auth status

Example output:

github.com
✓ Logged in to github.com as your-username (user)
✓ Git operations for github.com configured to use https protocol.

🔄 Switching Between Multiple Accounts

The CLI can handle multiple accounts:

Log in your work account:

\*\* gh auth login --hostname github.com --git-protocol https

(approve with your work account in browser)

When you want to use another account:

gh auth switch

and pick the account you need.

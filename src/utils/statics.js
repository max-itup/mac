export const description = `#!/usr/bin/env bash

#
#  __  __              _____ _     _    _         _ 
# |  \\/  |            |_   _| |   | |  | |       | |
# | \\  / | __ ___  __   | | | |_  | |  | |_ __   | |
# | |\\/| |/ _\` \\ \\/ /   | | | __| | |  | | '_ \\  | |
# | |  | | (_| |>  <   _| |_| |_  | |__| | |_) | |_|
# |_|  |_|\\__,_/_/\\_\\ |_____|\\__|  \\____/| .__/  (_)
#                                        | |
#                                        |_|

echo "[✋] MaxItUp is a tool to create a setup script for newly formatted Mac devices."

echo "[😉] Just start selecting items from the left pane and watch how the script is updating!"

echo "[💻] Move to your download directory and use your terminal to run the script and install selected apps and packages by running 'sh setup.sh'"

echo "[👋] Visit https://max-itup.github.io/mac/ for more details"`;

export const placeholder = `${description}
{{MAIN}}
`;

export const main = `

echo "[🚀] Starting setup"

# Install Homebrew if not already installed
if test ! $(which brew); then
    echo "[🍺] Installing homebrew..."
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

echo "[🍺] Updating homebrew..."
brew update
{{PACKAGES}}{{CASKS}}{{GEMS}}
echo "[🧼] Cleaning up..."
brew cleanup -s
{{OS_SETTINGS}}
echo "[🎉] Setup complete!"`;

export function brew(items) {
    if (items.length === 0) {
        return  "" ;
    }

    const codes = items.map(c => c.code).join("\n    ");
    return `
PACKAGES=(
    ${codes}
)
echo "[🍺] Installing brew packages..."
brew install \${PACKAGES[@]}
`
}

export function casks(items) {
    if (items.length === 0) {
        return  "" ;
    }

    const codes = items.map(c => c.code).join("\n    ");
    return `
CASKS=(
    ${codes}
)
echo "[🍺] Installing cask apps..."
brew cask install \${CASKS[@]}
`
}

export function gems(items) {
    if (items.length === 0) {
        return  "" ;
    }

    const codes = items.map(c => c.code).join("\n    ");
    return `
GEMS=(
    ${codes}
)
echo "[💎] Installing Ruby gems..."
sudo gem install \${GEMS[@]}
`
}

export function os_settings(items) {
    if (items.length === 0) {
        return  "" ;
    }

    const codes = items.map(c => `${c.type} ${c.code}`).join("\n");
    return `
echo "[🛠] Configuring System..."
${codes}
echo "[⚠️] Some changes aren't applied until you log out and back in."
`
}
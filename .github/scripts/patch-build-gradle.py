#!/usr/bin/env python3
"""Patch android/app/build.gradle to enable v1+v2+v3 signing on debug builds.

Capacitor's generated build.gradle only enables v2+ signing which breaks
installs on Android 6 devices. We inject a signingConfigs block with all
schemes enabled and wire it into the debug buildType.
"""
import re
import sys
from pathlib import Path

path = Path("android/app/build.gradle")
content = path.read_text()

pattern = re.compile(
    r"    buildTypes \{\s*\n"
    r"        release \{\s*\n"
    r"            minifyEnabled false\s*\n"
    r"            proguardFiles getDefaultProguardFile\('proguard-android\.txt'\), 'proguard-rules\.pro'\s*\n"
    r"        \}\s*\n"
    r"    \}"
)

replacement = """    signingConfigs {
        debug {
            storeFile file("${System.properties['user.home']}/.android/debug.keystore")
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
            v1SigningEnabled true
            v2SigningEnabled true
            enableV3Signing true
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }"""

new_content, count = pattern.subn(replacement, content)
if count != 1:
    print("ERROR: buildTypes block not found in expected format", file=sys.stderr)
    print("--- FILE CONTENTS ---", file=sys.stderr)
    print(content, file=sys.stderr)
    sys.exit(1)

path.write_text(new_content)
print("Patched android/app/build.gradle successfully")

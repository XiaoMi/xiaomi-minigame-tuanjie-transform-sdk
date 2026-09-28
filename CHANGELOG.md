---
uid: changelog
---
# Changelog
All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).
## [1.0.20] - 2026-06-16
### Fixed
- Fix `BuildMiniGame` incorrectly reporting success when minigame conversion fails.
- Fix enable web threads flag when script debugging is enabled.

## [1.0.19] - 2026-05-14
### Added
- Added support for Tuanjie 1.9.0 engine features. This support is currently available only in Android ConnectApp.
- Updated the package description.
### Fixed
- Fixed occasional Vulkan build issues.

## [1.0.18] - 2026-03-12
### Fixed
- Fix `Clear Streaming Assets` button functionality in build panel.
- Fix occasional deadlock issue for node.

## [1.0.17] - 2026-01-28
### Fixed
- Fix incorrect folder path issues when switching BuildProfiles in UOS CDN panel.
- Remove `showMonitorSuggestModal` field.
- Update the default coverview background image for games.
- Launch Minihost-PC as debug mode by default.
- 
## [1.0.16] - 2025-12-17
### Fixed
- Fix Unexpected CDN Upload Issues
### Added
- Support launching Minihost-PC after game upload
- Support customized settings saving when changing BuildProfiles

## [1.0.15] - 2025-12-15
### Added
- Support Vulkan API (experimental)
- Adapt to Tuanjie 1.8.0

## [1.0.14] - 2025-11-04
### Fixed
- Fix iOS video player

## [1.0.13] - 2025-10-13
### Fixed
- Fix UOS Window when using `Addressable`
 
## [1.0.12] - 2025-09-25
### Fixed
- Fix UOS CDN
- Fix GetHostByName

## [1.0.11] - 2025-09-16
### Fixed
- Fix UOS CDN

## [1.0.10] - 2025-09-16
### Fixed
- Fix `CheckTJFSReady` and `CheckWXFSReady`
- Fixed UOS CDN integration to support editable CDN paths

## [1.0.9] - 2025-08-27
### Fixed
- Fix issue
- Adapt to tuanjie 1.6

## [1.0.8] - 2025-08-13
### Added
- Add UOS CDN

## [1.0.7] - 2025-07-08
### Fixed
- Fix webgl issue

## [1.0.6] - 2025-07-08
### Fixed
- Fix issue causing building error in android platform 

## [1.0.5] - 2025-06-20
### Changes
- Store expired upload record in another file

## [1.0.4] - 2025-06-20
### Changes
 - Adapt for Tuanjie 1.6.0 

## [1.0.3] - 2025-06-16
### Added
- Deal with temp game id (when game id is not specified explictly)

## [1.0.2] - 2025-05-19
### Added
- Add package update logic
- Use default game id when no id provided explicitly

## [1.0.1] - 2025-05-12
### Fixed
- Fix an issue causing audio errors

### Added
- Integrate support for the WeChat API
- Add [API document](./DOCUMENT.md)

### Changed
- Update `link.xml` and ensured it's always copied before the build process
- Update Unity logo

### Removed
- Remove custom `WebGLTemplates` and use Unity's default templates instead
- Remove WebGL2 setting on the panel and configuration should be done directly in **Player Settings**

## [1.0.0] - 2025-04-18
### Added
- Add support for C# debugger

## [0.3.5] - 2025-04-09
### Fixed
- Remove dev host build profile when installing minihost package

## [0.3.4] - 2025-04-07
### Added
- Add ScriptDebugging option
- Add support for PlayerPrefs in editor mode
  
### Fixed
- Fix some small bugs 

## [0.3.3] - 2025-03-31
### Fixed
- Adapt to tuanjie 1.5

## [0.3.2] - 2025-03-28
### Fixed
- Fix some small bugs 

## [0.3.1] - 2025-03-27
### Fixed
- Fix some small bugs 

## [0.3.0] - 2025-03-27
### Added
- Persist configuration for background image and CDN

## [0.2.9] - 2025-03-26
### Added
- Persist configuration for panel

## [0.2.8] - 2025-03-26
### Fixed
- Fix some small bugs 

## [0.2.7] - 2025-03-26
### Fixed
- Fix some small bugs for tuanjie 1.3.5

## [0.2.6] - 2025-03-26
### Fixed
- Fix some small bugs for tuanjie 1.3.5
### Changes
 - Update Readme

## [0.2.5] - 2025-03-25
### Changes
 - Build Profile only for tuanjie 1.5 or newer
 - Include more debug options in build window

## [0.2.4] - 2025-03-25
### Changes
 - Add minihost-plugin.runtime.dll and minihost-plugin.editor.dll

## [0.2.3] - 2025-03-24
### Changes
 - Adapt to tuanjie 1.5 on mac os
 - Update unity js plugin

## [0.2.2] - 2025-03-21
### Fixed
 - Add coverviewCustomized in game.js
 - Add more error messages for user feedback
 - Fix some small bugs

## [0.2.1] - 2025-03-20
### Fixed
 - Fix some small bugs


## [0.2.0] - 2025-03-20
### Fixed
 - Fix some small bugs


## [0.1.9] - 2025-03-19
### Fixed
 - Optimize package import speed
 - Add builtin deps: nodejs
 - Different Minihost profile can configure different configurations


## [0.1.8] - 2025-03-18
### Fixed
 - Clean up legacy build profiles after removing the "cn.tuanjie.minigame.host" package
 - Add builtin deps: nodejs

## [0.1.7] - 2025-03-17
### Added
 - Minify js files

## [0.1.6] - 2025-03-14
### Fixed
 - Deal with case when failed to get temp session url
 - Fix some small bugs

## [0.1.5] - 2025-03-14
### Added
 - Add Check and remove old "cn.tuanjie.minigame.host" package logic
 - Add WXWASMSDK aliases to compatible with wx sdk

## [0.1.4] - 2025-03-10
### Added
 - Add UploadWindows record clean logic (clean record 7 days before)
### Changes
 - Adapt for Tuanjie 1.5.0 new PlayerSettings API

 - Adapt for Unity RA 2021 and 2022
### Fixed
 - Fix bugs related to UploadWindows



## [0.1.3] - 2025-03-07
### Fixed
 - Some small fixes

## [0.1.2] - 2025-03-04
### Changes
 - Adapt to tuanjie 1.5 or newer

 - some changes to UnityPlugin

## [0.1.1] - 2025-03-03
### Fixed
 - Fix some procedure issues for UploaderWindow 
### Changes
 - Adapt to tuanjie 1.4.3+ minigame API (MiniGameSubplatformInterface)

## [0.1.0] - 2025-02-28
### Added
 - Added sdk to build unity project for tuanjie minihost platform and upload the built package to minihost server

### This is the first release of *Tuanjie Mini Host Tool*.
 Source code release of the Tuanjie Mini Host Tool package, with no added documentation.
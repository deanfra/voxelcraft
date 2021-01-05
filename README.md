# Minecraft voxel generator

[Built upon the three.js voxel painter example](https://threejs.org/examples/webgl_interactive_voxelpainter.html)

Initially built as a simple voxel painter that allows you to export your design to a Minecraft version 1.16 command block.

[Open the app on Netlify](https://voxelcraft.netlify.app/)

Possible features and improvements to come:

### Features

- [ ] Update saved a template (rather than create/delete)
- [ ] Paint mode
- [ ] Shape mode
- [ ] Larger grid area
- [ ] Windows for house & building generation
- [ ] Slabs (with orientation)
- [ ] Logs with orientation
- [ ] Mirror Voxels on y/z axis
- [x] Stairs (with orientation)
- [x] More UI controls for randomizers
- [x] Frames for house generation
- [x] Roofs for house generation
- [x] Mirror Voxels x
- [x] Flip model x/y/z
- [x] Move model x/y/z
- [x] Prefilled example
- [x] Texture selection
- [x] House generator
- [x] Building generator

### Develop

`npm install`

`npm run start`

You can run a dev server on: `localhost:8080/build`

### Build

`npm run build`

Assets will be built to `./build`

### Test

`npm run test`

### Export to minecraft

1. Click the "Generate command code" link.
1. Copy the command block code that is generated
1. In minecraft, open the terminal with `/`
1. Give yourself a command block `/give <player_name> minecraft:command_block`
1. Place the command block where you'd like
1. Right click the command block to bring up the options
1. Paste the generated code in the the text field and click "Done"
1. Activate it with redstone, or select "Always Active" to trigger it immediately

The design will generate 1 block above the command block, and the code will auto-delete the command block. You can bury the command block below the ground to make your design sit on the ground.

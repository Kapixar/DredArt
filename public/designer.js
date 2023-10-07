const dzDesigner = document.querySelector('#dz-designer + label');
const dzCompact = document.querySelector('#dz-compact + label');
const version = '2.0';
document.getElementById('version').textContent = version;

document.onpaste = (e) => { handlePaste(e, generateDesigner); };

document.querySelector('#dz-designer').onchange = function () { handleInput(this, generateDesigner); };
dzDesigner.ondrop = function (e) { handleDrop(e, this, generateDesigner); };
dzDesigner.ondragover = function (e) { handleDragOver(e, this); };
dzDesigner.ondragleave = function (e) { handleDragLeave(e, this); };

document.querySelector('#dz-compact').onchange = function () { handleInput(this, generateCompact); };
dzCompact.ondrop = function (e) { handleDrop(e, this, generateCompact); };
dzCompact.ondragover = function (e) { handleDragOver(e, this); };
dzCompact.ondragleave = function (e) { handleDragLeave(e, this); };

const rgb = [[222, 165, 164], [214, 145, 136], [173, 111, 105], [128, 64, 64], [77, 0, 0], [77, 25, 0], [128, 0, 0], [144, 30, 30], [186, 1, 1], [179, 54, 54], [179, 95, 54], [255, 0, 0], [216, 124, 99], [255, 64, 64], [255, 128, 128], [255, 195, 192], [195, 153, 83], [128, 85, 64], [128, 106, 64], [77, 51, 38], [77, 51, 0], [128, 42, 0], [155, 71, 3], [153, 101, 21], [213, 70, 0], [218, 99, 4], [255, 85, 0], [237, 145, 33], [255, 179, 31], [255, 128, 64], [255, 170, 128], [255, 212, 128], [181, 179, 92], [77, 64, 38], [77, 77, 0], [128, 85, 0], [179, 128, 7], [183, 162, 20], [179, 137, 54], [238, 230, 0], [255, 170, 0], [255, 204, 0], [255, 255, 0], [255, 191, 64], [255, 255, 64], [223, 190, 111], [255, 255, 128], [234, 218, 184], [199, 205, 144], [128, 128, 64], [77, 77, 38], [64, 77, 38], [128, 128, 0], [101, 114, 32], [141, 182, 0], [165, 203, 12], [179, 179, 54], [191, 201, 33], [206, 255, 0], [170, 255, 0], [191, 255, 64], [213, 255, 128], [248, 249, 156], [253, 254, 184], [135, 169, 107], [106, 128, 64], [85, 128, 64], [51, 77, 38], [51, 77, 0], [67, 106, 13], [85, 128, 0], [42, 128, 0], [103, 167, 18], [132, 222, 2], [137, 179, 54], [95, 179, 54], [85, 255, 0], [128, 255, 64], [170, 255, 128], [210, 248, 176], [143, 188, 143], [103, 146, 103], [64, 128, 64], [38, 77, 38], [25, 77, 0], [0, 77, 0], [0, 128, 0], [34, 139, 34], [3, 192, 60], [70, 203, 24], [54, 179, 54], [54, 179, 95], [0, 255, 0], [64, 255, 64], [119, 221, 119], [128, 255, 128], [64, 128, 85], [64, 128, 106], [38, 77, 51], [0, 77, 26], [0, 77, 51], [0, 128, 43], [23, 114, 69], [0, 171, 102], [28, 172, 120], [11, 218, 81], [0, 255, 85], [80, 200, 120], [64, 255, 128], [128, 255, 170], [128, 255, 212], [168, 227, 189], [110, 174, 161], [64, 128, 128], [38, 77, 64], [38, 77, 77], [0, 77, 77], [0, 128, 85], [0, 166, 147], [0, 204, 153], [0, 204, 204], [54, 179, 137], [54, 179, 179], [0, 255, 170], [0, 255, 255], [64, 255, 191], [64, 255, 255], [128, 255, 255], [133, 196, 204], [93, 138, 168], [64, 106, 128], [38, 64, 77], [0, 51, 77], [0, 128, 128], [0, 85, 128], [0, 114, 187], [8, 146, 208], [54, 137, 179], [33, 171, 205], [0, 170, 255], [100, 204, 219], [64, 191, 255], [128, 212, 255], [175, 238, 238], [64, 85, 128], [38, 51, 77], [0, 26, 77], [0, 43, 128], [0, 47, 167], [54, 95, 179], [40, 106, 205], [0, 127, 255], [0, 85, 255], [49, 140, 231], [73, 151, 208], [64, 128, 255], [113, 166, 210], [100, 149, 237], [128, 170, 255], [182, 209, 234], [146, 161, 207], [64, 64, 128], [38, 38, 77], [0, 0, 77], [25, 0, 77], [0, 0, 128], [42, 0, 128], [0, 0, 205], [54, 54, 179], [95, 54, 179], [0, 0, 255], [28, 28, 240], [106, 90, 205], [64, 64, 255], [133, 129, 217], [128, 128, 255], [177, 156, 217], [150, 123, 182], [120, 81, 169], [85, 64, 128], [106, 64, 128], [51, 38, 77], [51, 0, 77], [85, 0, 128], [137, 54, 179], [85, 0, 255], [138, 43, 226], [167, 107, 207], [127, 64, 255], [191, 64, 255], [148, 87, 235], [170, 128, 255], [153, 85, 187], [140, 100, 149], [128, 64, 128], [64, 38, 77], [77, 38, 77], [77, 0, 77], [128, 0, 128], [159, 0, 197], [179, 54, 179], [184, 12, 227], [170, 0, 255], [255, 0, 255], [255, 64, 255], [213, 128, 255], [255, 128, 255], [241, 167, 254], [128, 64, 106], [105, 45, 84], [77, 38, 64], [77, 0, 51], [128, 0, 85], [162, 0, 109], [179, 54, 137], [202, 31, 123], [255, 0, 170], [255, 29, 206], [233, 54, 167], [207, 107, 169], [255, 64, 191], [218, 112, 214], [255, 128, 213], [230, 168, 215], [145, 95, 109], [128, 64, 85], [77, 38, 51], [77, 0, 25], [128, 0, 42], [215, 0, 64], [179, 54, 95], [255, 0, 127], [255, 0, 85], [255, 0, 40], [222, 49, 99], [208, 65, 126], [215, 59, 62], [255, 64, 127], [249, 90, 97], [255, 128, 170], [17, 17, 17], [34, 34, 34], [51, 51, 51], [68, 68, 68], [85, 85, 85], [102, 102, 102], [119, 119, 119], [136, 136, 136], [153, 153, 153], [170, 170, 170], [187, 187, 187], [204, 204, 204], [221, 221, 221], [238, 238, 238], [255, 255, 255]];
const lab = [[72.973, 20.879, 8.771], [66.769, 24.986, 15.414], [53.249, 23.862, 13.577], [35.257, 27.519, 12.689], [13.098, 33.658, 20.53], [16.862, 23.24, 25.362], [25.536, 48.045, 38.057], [31.701, 46.623, 30.116], [38.667, 63.087, 52.626], [41.987, 50.289, 29.243], [49.541, 30.648, 38.005], [53.241, 80.092, 67.203], [61.584, 33.22, 29.142], [57.37, 70.55, 44.821], [68.214, 48.189, 22.696], [84.017, 21.005, 9.826], [65.757, 7.543, 42.297], [40.34, 15.274, 19.489], [45.999, 2.855, 26.747], [23.953, 9.928, 12.964], [23.491, 7.173, 32.806], [30.026, 35.52, 41.853], [40.383, 31.826, 49.576], [47.152, 14.539, 49.295], [50.134, 53.984, 61.11], [55.93, 42.797, 63.893], [59.675, 62.047, 69.959], [68.292, 27.316, 67.337], [78.23, 16.985, 76.627], [67.333, 44.136, 55.352], [77.025, 26.789, 34.369], [86.952, 4.923, 46.938], [71.445, -11.476, 44.275], [27.804, 1.536, 17.957], [31.545, -9.058, 39.703], [39.727, 11.681, 48.136], [57.114, 10.878, 61.593], [66.489, -5.645, 66.598], [59.656, 7.393, 48.975], [89.287, -16.584, 88.142], [76.078, 21.325, 79.7], [84.2, 3.68, 85.217], [97.139, -21.554, 94.478], [81.235, 11.702, 69.125], [97.289, -20.342, 84.107], [78.266, 1.874, 43.989], [97.769, -16.538, 59.982], [87.532, 0.174, 18.744], [80.638, -11.793, 29.765], [52.284, -9.626, 34.448], [31.865, -6.519, 23.005], [30.73, -12.613, 21.357], [51.869, -12.929, 56.675], [45.505, -16.772, 41.674], [68.837, -34.125, 69.782], [76.52, -33.907, 75.075], [70.934, -15.048, 60.408], [77.852, -21.745, 73.375], [93.728, -41.174, 90.421], [91.714, -54.462, 88.004], [92.999, -45.309, 78.575], [94.833, -32.527, 55.78], [96.042, -13.648, 44.534], [98.125, -10.948, 33.473], [65.427, -22.972, 28.297], [50.538, -19.094, 31.929], [49.178, -27.416, 29.955], [29.791, -18.268, 19.984], [29.441, -21.673, 37.193], [40.459, -28.507, 42.797], [48.722, -31.922, 52.921], [46.882, -45.936, 50.695], [62.138, -41.797, 61.045], [80.264, -54.353, 78.178], [67.891, -32.5, 56.365], [65.7, -47.484, 53.42], [88.661, -77.982, 84.308], [90.08, -65.859, 74.763], [92.408, -47.53, 52.283], [93.438, -24.564, 30.677], [72.087, -23.82, 18.038], [56.506, -23.702, 18.215], [48.131, -34.561, 28.426], [29.055, -23.191, 18.903], [28.152, -31.342, 35.617], [27.593, -36.217, 34.922], [46.227, -51.698, 49.897], [50.593, -49.585, 45.016], [68.052, -66.385, 52.974], [72.28, -64.289, 68.077], [64.394, -57.776, 51.651], [64.842, -52.53, 33.146], [87.735, -86.183, 83.179], [88.436, -79.255, 72.6], [80.159, -50.083, 40.913], [90.626, -59.893, 49.7], [48.49, -30.873, 17.19], [48.968, -26.213, 5.669], [29.308, -20.645, 11.256], [27.796, -33.622, 23.945], [28.238, -28.375, 9.617], [46.461, -48.703, 36.704], [42.224, -37.042, 17.76], [61.726, -53.536, 25.31], [62.597, -48.39, 16.767], [76.56, -71.536, 53.648], [88.051, -82.112, 64.672], [72.473, -51.25, 30.255], [89, -72.452, 47.33], [91.238, -53.517, 30.042], [92.068, -45.301, 9.772], [85.471, -26.35, 12.571], [66.641, -23.529, 0.187], [49.6, -20.419, -6.327], [29.638, -17.478, 3.458], [30.048, -13.765, -4.286], [29.013, -20.208, -5.938], [47.096, -41.089, 15.062], [61.112, -40.542, -0.395], [73.208, -54.463, 13.655], [74.534, -40.645, -11.944], [65.615, -44.076, 11.715], [66.73, -32.963, -9.875], [89.119, -69.23, 26.817], [91.113, -48.088, -14.131], [90.029, -60.87, 17.459], [91.605, -44.86, -13.344], [93.156, -35.231, -10.868], [75.341, -18.059, -10.41], [55.411, -7.133, -20.656], [42.696, -8.14, -16.743], [25.607, -5.831, -10.975], [19.652, -4.522, -20.323], [48.254, -28.846, -8.477], [34.096, -4.929, -30.264], [46.473, 0.824, -45.792], [57.231, -9.78, -40.723], [53.951, -11.222, -29.348], [64.846, -23.05, -27.178], [66.493, -6.232, -52.061], [76.683, -25.96, -16.644], [73.264, -13.886, -41.367], [81.232, -14.166, -28.877], [90.06, -19.638, -6.4], [36.262, 4.786, -26.708], [21.265, 2.857, -17.678], [11.095, 14.187, -34.069], [21.153, 24.141, -51.13], [26.221, 37.034, -66.847], [41.567, 14.328, -48.916], [45.859, 15.324, -57.109], [54.444, 19.402, -71.357], [43.82, 45.821, -88.716], [57.246, 4.912, -53.523], [59.98, -6.31, -36.323], [55.832, 22.585, -69.058], [66.085, -5.708, -27.829], [61.926, 9.333, -49.298], [69.864, 8.672, -46.52], [82.639, -3.67, -15.303], [66.6, 5.255, -25.207], [30.193, 18.569, -36.318], [17.151, 12.111, -24.171], [4.838, 30.941, -44.392], [6.706, 33.908, -41.243], [12.972, 47.502, -64.702], [15.749, 48.602, -59.997], [24.971, 67.177, -91.5], [31.058, 40.636, -65.996], [34.652, 46.815, -59.97], [32.297, 79.188, -107.86], [32.627, 69.981, -98.835], [45.336, 36.039, -57.772], [41.175, 60.511, -93.028], [57.747, 22.723, -44.645], [59.201, 33.096, -63.458], [68.119, 19.886, -28.197], [56.115, 22.256, -27.246], [42.373, 34.715, -41.451], [32.161, 24.249, -33.066], [34.579, 30.519, -29.083], [18.478, 16.094, -21.98], [10.847, 36.927, -34.275], [21.908, 52.405, -49.622], [39.935, 55.156, -51.156], [36.27, 80.714, -101.127], [42.188, 69.845, -74.763], [55.315, 42.082, -42.63], [46.174, 67.18, -84.617], [53.989, 77.235, -71.539], [50.816, 54.735, -65.764], [62.679, 42.735, -57.697], [48.08, 45.654, -42.7], [48.083, 25.07, -20.496], [37.509, 37.329, -24.282], [20.092, 20.449, -19.326], [21.945, 24.949, -16.296], [16.074, 41.282, -25.561], [29.785, 58.928, -36.487], [40.252, 75.202, -61.06], [46.283, 64.413, -40.646], [46.976, 82.658, -67.237], [46.667, 86.978, -83.605], [60.324, 98.234, -60.825], [63.468, 89.043, -55.808], [67.131, 53.754, -50.355], [72.176, 64.936, -42.077], [78.167, 41.259, -32.367], [36.551, 33.311, -12.053], [28.17, 32.014, -11.001], [21.337, 22.317, -8.405], [14.497, 37.363, -9.708], [27.426, 53.056, -12.411], [35.572, 63.027, -14.904], [44.277, 58.073, -18.679], [45.594, 68.875, -7.735], [56.256, 88.098, -18.819], [58.603, 89.518, -36.008], [54.821, 75.275, -19.612], [58.647, 47.077, -15.324], [60.511, 80.405, -24.471], [62.803, 55.282, -34.404], [70.53, 58.245, -21.545], [75.907, 30.13, -14.787], [46.055, 22.444, 0.484], [35.816, 30.078, 0.134], [20.841, 20.072, -0.197], [13.522, 34.809, 8.098], [26.034, 49.396, 14.749], [45.39, 71.816, 28.958], [42.84, 53.266, 5.066], [54.865, 84.463, 4.641], [53.945, 82.006, 28.688], [53.407, 80.545, 53.46], [50.254, 67.533, 14.169], [50.335, 60.711, -2.41], [49.408, 60.237, 34.958], [58.476, 74.112, 9.794], [60.178, 61.013, 29.42], [69.188, 52.519, 0.476], [5.063, 0, 0], [13.228, 0, 0], [21.247, 0, 0], [28.852, 0, 0], [36.146, 0, 0], [43.192, 0, 0], [50.034, 0, 0], [56.703, 0, 0], [63.223, 0, 0], [69.61, 0, 0], [75.881, 0, 0], [82.046, 0, 0], [88.115, 0, 0], [94.098, 0, 0], [100, 0, 0]];

function generateDesigner(originalImg) {
    // show the boxes
    changeView('#designer');
    console.log(originalImg);
}

function generateCompact(originalImg) {
    changeView('#compact');
    console.log(originalImg);
}

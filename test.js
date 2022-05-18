/** @param {NS} ns **/
export const solvers = {};

export function main(ns) {

    var data = [[0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 1, 1, 1],
    [0, 0, 0, 0]];


    function ShortestPathInAGrid(data) {
        let H = data.length, W = data[0].length;
        let dist = Array.from(Array(H), () => Array(W).fill(Number.POSITIVE_INFINITY));
        dist[0][0] = 0;

        let queue = [[0, 0]];
        while (queue.length > 0) {
            let [i, j] = queue.shift();
            let d = dist[i][j];

            if (i > 0 && d + 1 < dist[i - 1][j] && data[i - 1][j] !== 1) { dist[i - 1][j] = d + 1; queue.push([i - 1, j]); }
            if (i < H - 1 && d + 1 < dist[i + 1][j] && data[i + 1][j] !== 1) { dist[i + 1][j] = d + 1; queue.push([i + 1, j]); }
            if (j > 0 && d + 1 < dist[i][j - 1] && data[i][j - 1] !== 1) { dist[i][j - 1] = d + 1; queue.push([i, j - 1]); }
            if (j < W - 1 && d + 1 < dist[i][j + 1] && data[i][j + 1] !== 1) { dist[i][j + 1] = d + 1; queue.push([i, j + 1]); }
        }

        let path = "";
        if (Number.isFinite(dist[H - 1][W - 1])) {
            let i = H - 1, j = W - 1;
            while (i !== 0 || j !== 0) {
                let d = dist[i][j];

                let new_i = 0, new_j = 0, dir = "";
                if (i > 0 && dist[i - 1][j] < d) { d = dist[i - 1][j]; new_i = i - 1; new_j = j; dir = "D"; }
                if (i < H - 1 && dist[i + 1][j] < d) { d = dist[i + 1][j]; new_i = i + 1; new_j = j; dir = "U"; }
                if (j > 0 && dist[i][j - 1] < d) { d = dist[i][j - 1]; new_i = i; new_j = j - 1; dir = "R"; }
                if (j < W - 1 && dist[i][j + 1] < d) { d = dist[i][j + 1]; new_i = i; new_j = j + 1; dir = "L"; }

                i = new_i; j = new_j;
                path = dir + path;
            }
        }

        return path;
    }

    ns.tprint (ShortestPathInAGrid(data))

}
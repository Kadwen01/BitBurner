export const solvers = {};

solvers["Algorithmic Stock Trader I"] = (data) => {
  let maxCur = 0;
  let maxSoFar = 0;
  for (let i = 1; i < data.length; ++i) {
    maxCur = Math.max(0, maxCur += data[i] - data[i - 1]);
    maxSoFar = Math.max(maxCur, maxSoFar);
  }

  return maxSoFar;
};

solvers["Algorithmic Stock Trader II"] = (data) => {
  let profit = 0;
  for (let p = 1; p < data.length; ++p) {
    profit += Math.max(data[p] - data[p - 1], 0);
  }

  return profit;
};

solvers["Algorithmic Stock Trader III"] = (data) => {
  let hold1 = Number.MIN_SAFE_INTEGER;
  let hold2 = Number.MIN_SAFE_INTEGER;
  let release1 = 0;
  let release2 = 0;
  for (const price of data) {
    release2 = Math.max(release2, hold2 + price);
    hold2 = Math.max(hold2, release1 - price);
    release1 = Math.max(release1, hold1 + price);
    hold1 = Math.max(hold1, price * -1);
  }

  return release2;
};

solvers["Algorithmic Stock Trader IV"] = (data) => {
  const k = (data[0]);
  const prices = (data[1]);

  const len = prices.length;
  if (len < 2) { return (parseInt(ans) === 0); }
  if (k > len / 2) {
    let res = 0;
    for (let i = 1; i < len; ++i) {
      res += Math.max(prices[i] - prices[i - 1], 0);
    }

    return res;
  }

  const hold = [];
  const rele = [];
  hold.length = k + 1;
  rele.length = k + 1;
  for (let i = 0; i <= k; ++i) {
    hold[i] = Number.MIN_SAFE_INTEGER;
    rele[i] = 0;
  }

  let cur;
  for (let i = 0; i < len; ++i) {
    cur = prices[i];
    for (let j = k; j > 0; --j) {
      rele[j] = Math.max(rele[j], hold[j] + cur);
      hold[j] = Math.max(hold[j], rele[j - 1] - cur);
    }
  }

  return rele[k];
};

solvers["Array Jumping Game"] = (data) => {
  const n = data.length;
  let i = 0;
  for (let reach = 0; i < n && i <= reach; ++i) {
    reach = Math.max(i + data[i], reach);
  }
  const solution = (i === n);

  if (solution) {
    return 1;
  }
  else {
    return 0;
  }
};

solvers["Array Jumping Game II"] = (data) => {
  const n = data.length;
  let reach = 0;
  let jumps = 0;
  let lastJump = -1;
  while (reach < n - 1) {
    let jumpedFrom = -1;
    for (let i = reach; i > lastJump; i--) {
      if (i + data[i] > reach) {
        reach = i + data[i];
        jumpedFrom = i;
      }
    }
    if (jumpedFrom === -1) {
      jumps = 0;
      break;
    }
    lastJump = jumpedFrom;
    jumps++;
  }
  return jumps;
};

solvers["Unique Paths in a Grid I"] = (data) => {
  const n = data[0]; // Number of rows
  const m = data[1]; // Number of columns
  const currentRow = [];
  currentRow.length = n;

  for (let i = 0; i < n; i++) {
    currentRow[i] = 1;
  }
  for (let row = 1; row < m; row++) {
    for (let i = 1; i < n; i++) {
      currentRow[i] += currentRow[i - 1];
    }
  }

  return currentRow[n - 1];
};

solvers["Merge Overlapping Intervals"] = (data) => {
  const intervals = data.slice();
  intervals.sort((a, b) => {
    return a[0] - b[0];
  });

  const result = [];
  let start = intervals[0][0];
  let end = intervals[0][1];
  for (const interval of intervals) {
    if (interval[0] <= end) {
      end = Math.max(end, interval[1]);
    } else {
      result.push([start, end]);
      start = interval[0];
      end = interval[1];
    }
  }
  result.push([start, end]);

  const sanitizedResult = convert2DArrayToString(result);
  return sanitizedResult;
};

solvers["Generate IP Addresses"] = (data, ans) => {
  const ret = [];
  for (let a = 1; a <= 3; ++a) {
    for (let b = 1; b <= 3; ++b) {
      for (let c = 1; c <= 3; ++c) {
        for (let d = 1; d <= 3; ++d) {
          if (a + b + c + d === data.length) {
            const A = parseInt(data.substring(0, a), 10);
            const B = parseInt(data.substring(a, a + b), 10);
            const C = parseInt(data.substring(a + b, a + b + c), 10);
            const D = parseInt(data.substring(a + b + c, a + b + c + d), 10);
            if (A <= 255 && B <= 255 && C <= 255 && D <= 255) {
              const ip = [A.toString(), ".",
              B.toString(), ".",
              C.toString(), ".",
              D.toString()].join("");
              if (ip.length === data.length + 3) {
                ret.push(ip);
              }
            }
          }
        }
      }
    }
  }
  return ret;
};

solvers["Sanitize Parentheses in Expression"] = (data) => {
  let left = 0;
  let right = 0;
  const res = [];

  for (let i = 0; i < data.length; ++i) {
    if (data[i] === '(') {
      ++left;
    } else if (data[i] === ')') {
      (left > 0) ? --left : ++right;
    }
  }

  function dfs(pair, index, left, right, s, solution, res) {
    if (s.length === index) {
      if (left === 0 && right === 0 && pair === 0) {
        for (let i = 0; i < res.length; i++) {
          if (res[i] === solution) { return; }
        }
        res.push(solution);
      }
      return;
    }

    if (s[index] === '(') {
      if (left > 0) {
        dfs(pair, index + 1, left - 1, right, s, solution, res);
      }
      dfs(pair + 1, index + 1, left, right, s, solution + s[index], res);
    } else if (s[index] === ')') {
      if (right > 0) dfs(pair, index + 1, left, right - 1, s, solution, res);
      if (pair > 0) dfs(pair - 1, index + 1, left, right, s, solution + s[index], res);
    } else {
      dfs(pair, index + 1, left, right, s, solution + s[index], res);
    }
  }

  dfs(0, 0, left, right, data, "", res);
  return res;
};

solvers["Unique Paths in a Grid II"] = (data) => {
  const obstacleGrid = [];
  obstacleGrid.length = data.length;
  for (let i = 0; i < obstacleGrid.length; ++i) {
    obstacleGrid[i] = data[i].slice();
  }

  for (let i = 0; i < obstacleGrid.length; i++) {
    for (let j = 0; j < obstacleGrid[0].length; j++) {
      if (obstacleGrid[i][j] == 1) {
        obstacleGrid[i][j] = 0;
      } else if (i == 0 && j == 0) {
        obstacleGrid[0][0] = 1;
      } else {
        obstacleGrid[i][j] = (i > 0 ? obstacleGrid[i - 1][j] : 0) + (j > 0 ? obstacleGrid[i][j - 1] : 0);
      }
    }
  }

  return (obstacleGrid[obstacleGrid.length - 1][obstacleGrid[0].length - 1]);
};

solvers["Find Largest Prime Factor"] = (data) => {
  let fac = 2;
  let n = data;
  while (n > ((fac - 1) * (fac - 1))) {
    while (n % fac === 0) {
      n = Math.round(n / fac);
    }
    ++fac;
  }

  return (n === 1 ? (fac - 1) : n);
};

solvers["Subarray with Maximum Sum"] = (data) => {
  const nums = data.slice();
  for (let i = 1; i < nums.length; i++) {
    nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
  }

  return Math.max(...nums);
};

solvers["Total Ways to Sum"] = (data) => {
  const ways = [1];
  ways.length = data + 1;
  ways.fill(0, 1);
  for (let i = 1; i < data; ++i) {
    for (let j = i; j <= data; ++j) {
      ways[j] += ways[j - i];
    }
  }

  return ways[data];
};

solvers["Total Ways to Sum II"] = (data) => {
  // https://www.geeksforgeeks.org/coin-change-dp-7/?ref=lbp
  const n = data[0];
  const s = data[1];
  const ways = [1];
  ways.length = n + 1;
  ways.fill(0, 1);
  for (let i = 0; i < s.length; i++) {
    for (let j = s[i]; j <= n; j++) {
      ways[j] += ways[j - s[i]];
    }
  }
  return ways[n];
};

solvers["Find All Valid Math Expressions"] = (data) => {
  const num = data[0];
  const target = data[1];

  function helper(res, path, num, target, pos, evaluated, multed) {
    if (pos === num.length) {
      if (target === evaluated) {
        res.push(path);
      }
      return;
    }

    for (let i = pos; i < num.length; ++i) {
      if (i != pos && num[pos] == '0') { break; }
      const cur = parseInt(num.substring(pos, i + 1));

      if (pos === 0) {
        helper(res, path + cur, num, target, i + 1, cur, cur);
      } else {
        helper(res, path + "+" + cur, num, target, i + 1, evaluated + cur, cur);
        helper(res, path + "-" + cur, num, target, i + 1, evaluated - cur, -cur);
        helper(res, path + "*" + cur, num, target, i + 1, evaluated - multed + multed * cur, multed * cur);
      }
    }
  }

  const result = [];
  helper(result, "", num, target, 0, 0, 0);

  return result;

};

solvers["Spiralize Matrix"] = (data) => {
  const spiral = [];
  const m = data.length;
  const n = data[0].length;
  let u = 0;
  let d = m - 1;
  let l = 0;
  let r = n - 1;
  let k = 0;
  while (true) {
    // Up
    for (let col = l; col <= r; col++) {
      spiral[k] = data[u][col];
      ++k;
    }
    if (++u > d) { break; }

    // Right
    for (let row = u; row <= d; row++) {
      spiral[k] = data[row][r];
      ++k;
    }
    if (--r < l) { break; }

    // Down
    for (let col = r; col >= l; col--) {
      spiral[k] = data[d][col];
      ++k;
    }
    if (--d < u) { break; }

    // Left
    for (let row = d; row >= u; row--) {
      spiral[k] = data[row][l];
      ++k;
    }
    if (++l > r) { break; }

  }
  return spiral;
};

solvers["Minimum Path Sum in a Triangle"] = (data) => {
  const n = data.length;
  const dp = data[n - 1].slice();
  for (let i = n - 2; i > -1; --i) {
    for (let j = 0; j < data[i].length; ++j) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + data[i][j];
    }
  }

  return dp[0];
};

solvers["Shortest Path in a Grid"] = (data) => {
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
};

solvers["HammingCodes: Integer to encoded Binary"] = (value) => {
  // encoding following Hammings rule
  function HammingSumOfParity(_lengthOfDBits) {
    // will calculate the needed amount of parityBits 'without' the "overall"-Parity (that math took me 4 Days to get it working)
    return _lengthOfDBits < 3 || _lengthOfDBits == 0 // oh and of course using ternary operators, it's a pretty neat function
      ? _lengthOfDBits == 0
        ? 0
        : _lengthOfDBits + 1
      : // the following math will only work, if the length is greater equal 3, otherwise it's "kind of" broken :D
      Math.ceil(Math.log2(_lengthOfDBits * 2)) <=
        Math.ceil(Math.log2(1 + _lengthOfDBits + Math.ceil(Math.log2(_lengthOfDBits))))
        ? Math.ceil(Math.log2(_lengthOfDBits) + 1)
        : Math.ceil(Math.log2(_lengthOfDBits));
  }
  const _data = value.toString(2).split(""); // first, change into binary string, then create array with 1 bit per index
  const _sumParity = HammingSumOfParity(_data.length); // get the sum of needed parity bits (for later use in encoding)
  const count = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  // function count for specific entries in the array, for later use

  const _build = ["x", "x", ..._data.splice(0, 1)]; // init the "pre-build"
  for (let i = 2; i < _sumParity; i++) {
    // add new paritybits and the corresponding data bits (pre-building array)
    _build.push("x", ..._data.splice(0, Math.pow(2, i) - 1));
  }
  // now the "calculation"... get the paritybits ('x') working
  for (const index of _build.reduce(function (a, e, i) {
    if (e == "x") a.push(i);
    return a;
  }, [])) {
    // that reduce will result in an array of index numbers where the "x" is placed
    const _tempcount = index + 1; // set the "stepsize" for the parityBit
    const _temparray = []; // temporary array to store the extracted bits
    const _tempdata = [..._build]; // only work with a copy of the _build
    while (_tempdata[index] !== undefined) {
      // as long as there are bits on the starting index, do "cut"
      const _temp = _tempdata.splice(index, _tempcount * 2); // cut stepsize*2 bits, then...
      _temparray.push(..._temp.splice(0, _tempcount)); // ... cut the result again and keep the first half
    }
    _temparray.splice(0, 1); // remove first bit, which is the parity one
    _build[index] = (count(_temparray, "1") % 2).toString(); // count with remainder of 2 and"toString" to store the parityBit
  } // parity done, now the "overall"-parity is set
  _build.unshift((count(_build, "1") % 2).toString()); // has to be done as last element
  return _build.join(""); // return the _build as string
};

solvers["HammingCodes: Integer to Encoded Binary"] = (_data) => {
  var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  // encoding following Hammings rule
  function HammingSumOfParity(_lengthOfDBits) {
    // will calculate the needed amount of parityBits 'without' the "overall"-Parity (that math took me 4 Days to get it working)
    return _lengthOfDBits < 3 || _lengthOfDBits == 0 // oh and of course using ternary operators, it's a pretty neat function
      ? _lengthOfDBits == 0
        ? 0
        : _lengthOfDBits + 1
      : // the following math will only work, if the length is greater equal 3, otherwise it's "kind of" broken :D
      Math.ceil(Math.log2(_lengthOfDBits * 2)) <=
        Math.ceil(Math.log2(1 + _lengthOfDBits + Math.ceil(Math.log2(_lengthOfDBits))))
        ? Math.ceil(Math.log2(_lengthOfDBits) + 1)
        : Math.ceil(Math.log2(_lengthOfDBits));
  }
  var _data = _data.toString(2).split(""); // first, change into binary string, then create array with 1 bit per index
  var _sumParity = HammingSumOfParity(_data.length); // get the sum of needed parity bits (for later use in encoding)
  var count = function (arr, val) {
    return arr.reduce(function (a, v) { return (v === val ? a + 1 : a); }, 0);
  };
  // function count for specific entries in the array, for later use
  var _build = __spreadArray(["x", "x"], _data.splice(0, 1), true); // init the "pre-build"
  for (var i = 2; i < _sumParity; i++) {
    // add new paritybits and the corresponding data bits (pre-building array)
    _build.push.apply(_build, __spreadArray(["x"], _data.splice(0, Math.pow(2, i) - 1), false));
  }
  // now the "calculation"... get the paritybits ('x') working
  for (var _i = 0, _a = _build.reduce(function (a, e, i) {
    if (e == "x")
      a.push(i);
    return a;
  }, []); _i < _a.length; _i++) {
    var index = _a[_i];
    // that reduce will result in an array of index numbers where the "x" is placed
    var _tempcount = index + 1; // set the "stepsize" for the parityBit
    var _temparray = []; // temporary array to store the extracted bits
    var _tempdata = __spreadArray([], _build, true); // only work with a copy of the _build
    while (_tempdata[index] !== undefined) {
      // as long as there are bits on the starting index, do "cut"
      var _temp = _tempdata.splice(index, _tempcount * 2); // cut stepsize*2 bits, then...
      _temparray.push.apply(// cut stepsize*2 bits, then...
        _temparray, _temp.splice(0, _tempcount)); // ... cut the result again and keep the first half
    }
    _temparray.splice(0, 1); // remove first bit, which is the parity one
    _build[index] = (count(_temparray, "1") % 2).toString(); // count with remainder of 2 and"toString" to store the parityBit
  } // parity done, now the "overall"-parity is set
  _build.unshift((count(_build, "1") % 2).toString()); // has to be done as last element
  return _build.join(""); // return the _build as string
}



solvers["HammingCodes: Encoded Binary to Integer"] = (_data) => {
  //check for altered bit and decode
  const _build = _data.split(""); // ye, an array for working, again
  const _testArray = []; //for the "truthtable". if any is false, the data has an altered bit, will check for and fix it
  const _sumParity = Math.ceil(Math.log2(_data.length)); // sum of parity for later use
  const count = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  // the count.... again ;)

  let _overallParity = _build.splice(0, 1).join(""); // store first index, for checking in next step and fix the _build properly later on
  _testArray.push(_overallParity == (count(_build, "1") % 2).toString() ? true : false); // first check with the overall parity bit
  for (let i = 0; i < _sumParity; i++) {
    // for the rest of the remaining parity bits we also "check"
    const _tempIndex = Math.pow(2, i) - 1; // get the parityBits Index
    const _tempStep = _tempIndex + 1; // set the stepsize
    const _tempData = [..._build]; // get a "copy" of the build-data for working
    const _tempArray = []; // init empty array for "testing"
    while (_tempData[_tempIndex] != undefined) {
      // extract from the copied data until the "starting" index is undefined
      const _temp = [..._tempData.splice(_tempIndex, _tempStep * 2)]; // extract 2*stepsize
      _tempArray.push(..._temp.splice(0, _tempStep)); // and cut again for keeping first half
    }
    const _tempParity = _tempArray.shift(); // and again save the first index separated for checking with the rest of the data
    _testArray.push(_tempParity == (count(_tempArray, "1") % 2).toString() ? true : false);
    // is the _tempParity the calculated data? push answer into the 'truthtable'
  }
  let _fixIndex = 0; // init the "fixing" index and start with 0
  for (let i = 1; i < _sumParity + 1; i++) {
    // simple binary adding for every boolean in the _testArray, starting from 2nd index of it
    _fixIndex += _testArray[i] ? 0 : Math.pow(2, i) / 2;
  }
  _build.unshift(_overallParity); // now we need the "overall" parity back in it's place
  // try fix the actual encoded binary string if there is an error
  if (_fixIndex > 0 && _testArray[0] == false) {
    // if the overall is false and the sum of calculated values is greater equal 0, fix the corresponding hamming-bit
    _build[_fixIndex] = _build[_fixIndex] == "0" ? "1" : "0";
  } else if (_testArray[0] == false) {
    // otherwise, if the the overall_parity is the only wrong, fix that one
    _overallParity = _overallParity == "0" ? "1" : "0";
  } else if (_testArray[0] == true && _testArray.some((truth) => truth == false)) {
    return 0; // uhm, there's some strange going on... 2 bits are altered? How? This should not happen 👀
  }
  // oof.. halfway through... we fixed an possible altered bit, now "extract" the parity-bits from the _build
  for (let i = _sumParity; i >= 0; i--) {
    // start from the last parity down the 2nd index one
    _build.splice(Math.pow(2, i), 1);
  }
  _build.splice(0, 1); // remove the overall parity bit and we have our binary value
  return parseInt(_build.join(""), 2); // parse the integer with redux 2 and we're done!
};

solvers["Proper 2-Coloring of a Graph"] = ([N, edges]) => {
  //Helper function to get neighbourhood of a vertex
  function neighbourhood(vertex) {
    const adjLeft = edges.filter(([a, _]) => a == vertex).map(([_, b]) => b);
    const adjRight = edges.filter(([_, b]) => b == vertex).map(([a, _]) => a);
    return adjLeft.concat(adjRight);
  }

  const coloring = Array(N).fill(undefined);
  while (coloring.some((val) => val === undefined)) {
    //Color a vertex in the graph
    const initialVertex = coloring.findIndex((val) => val === undefined);
    coloring[initialVertex] = 0;
    const frontier = [initialVertex];

    //Propogate the coloring throughout the component containing v greedily
    while (frontier.length > 0) {
      const v = frontier.pop() || 0;
      const neighbors = neighbourhood(v);

      //For each vertex u adjacent to v
      for (const id in neighbors) {
        const u = neighbors[id];

        //Set the color of u to the opposite of v's color if it is new,
        //then add u to the frontier to continue the algorithm.
        if (coloring[u] === undefined) {
          if (coloring[v] === 0) coloring[u] = 1;
          else coloring[u] = 0;

          frontier.push(u);
        }

        //Assert u,v do not have the same color
        else if (coloring[u] === coloring[v]) {
          //If u,v do have the same color, no proper 2-coloring exists
          return [];
        }
      }
    }
  }

  //If this code is reached, there exists a proper 2-coloring of the input graph.
  return coloring;
};

solvers["Compression II: LZ Decompression"] = (_data) => {
  let plain = "";

  for (let i = 0; i < _data.length;) {
    const literal_length = _data.charCodeAt(i) - 0x30;

    if (literal_length < 0 || literal_length > 9 || i + 1 + literal_length > _data.length) {
      return null;
    }

    plain += _data.substring(i + 1, i + 1 + literal_length);
    i += 1 + literal_length;

    if (i >= _data.length) {
      break;
    }
    const backref_length = _data.charCodeAt(i) - 0x30;

    if (backref_length < 0 || backref_length > 9) {
      return null;
    } else if (backref_length === 0) {
      ++i;
    } else {
      if (i + 1 >= _data.length) {
        return null;
      }

      const backref_offset = _data.charCodeAt(i + 1) - 0x30;
      if ((backref_length > 0 && (backref_offset < 1 || backref_offset > 9)) || backref_offset > plain.length) {
        return null;
      }

      for (let j = 0; j < backref_length; ++j) {
        plain += plain[plain.length - backref_offset];
      }

      i += 2;
    }
  }

  return plain;
};


solvers["Compression III: LZ Compression"] = (plain) => {
  // for state[i][j]:
  //      if i is 0, we're adding a literal of length j
  //      else, we're adding a backreference of offset i and length j
  var cur_state = Array.from(Array(10), function () { return Array(10).fill(null); });
  var new_state = Array.from(Array(10), function () { return Array(10); });
  function set(state, i, j, str) {
    var current = state[i][j];
    if (current == null || str.length < current.length) {
      state[i][j] = str;
    }
    else if (str.length === current.length && Math.random() < 0.5) {
      // if two strings are the same length, pick randomly so that
      // we generate more possible inputs to Compression II
      state[i][j] = str;
    }
  }
  // initial state is a literal of length 1
  cur_state[0][1] = "";
  for (var i = 1; i < plain.length; ++i) {
    for (var _i = 0, new_state_1 = new_state; _i < new_state_1.length; _i++) {
      var row = new_state_1[_i];
      row.fill(null);
    }
    var c = plain[i];
    // handle literals
    for (var length = 1; length <= 9; ++length) {
      var string = cur_state[0][length];
      if (string == null) {
        continue;
      }
      if (length < 9) {
        // extend current literal
        set(new_state, 0, length + 1, string);
      } else {
        // start new literal
        set(new_state, 0, 1, string + "9" + plain.substring(i - 9, i) + "0");
      }
      for (var offset = 1; offset <= Math.min(9, i); ++offset) {
        if (plain[i - offset] === c) {
          // start new backreference
          set(new_state, offset, 1, string + length + plain.substring(i - length, i));
        }
      }
    }
    // handle backreferences
    for (var offset = 1; offset <= 9; ++offset) {
      for (var length = 1; length <= 9; ++length) {
        var string = cur_state[offset][length];
        if (string == null) {
          continue;
        }
        if (plain[i - offset] === c) {
          if (length < 9) {
            // extend current backreference
            set(new_state, offset, length + 1, string);
          } else {
            // start new backreference
            set(new_state, offset, 1, string + "9" + offset + "0");
          }
        }
        // start new literal
        set(new_state, 0, 1, string + length + offset);
        // end current backreference and start new backreference
        for (var new_offset = 1; new_offset <= Math.min(9, i); ++new_offset) {
          if (plain[i - new_offset] === c) {
            set(new_state, new_offset, 1, string + length + offset + "0");
          }
        }
      }
    }
    var tmp_state = new_state;
    new_state = cur_state;
    cur_state = tmp_state;
  }
  var result = null;
  for (var len = 1; len <= 9; ++len) {
    var string = cur_state[0][len];
    if (string == null) {
      continue;
    }
    string += len + plain.substring(plain.length - len, plain.length);
    if (result == null || string.length < result.length) {
      result = string;
    }
    else if (string.length == result.length && Math.random() < 0.5) {
      result = string;
    }
  }
  for (var offset = 1; offset <= 9; ++offset) {
    for (var len = 1; len <= 9; ++len) {
      var string = cur_state[offset][len];
      if (string == null) {
        continue;
      }
      string += len + "" + offset;
      if (result == null || string.length < result.length) {
        result = string;
      } else if (string.length == result.length && Math.random() < 0.5) {
        result = string;
      }
    }
  }
  return result !== null && result !== void 0 ? result : "";
}

solvers["Compression I: RLE Compression"] = (_data) => {
  var result = '';
  if (_data.length > 0) {
    var count = 1;
    var value = _data[0];
    for (var i = 1; i < _data.length; ++i) {
      var entry = _data[i];
      if (entry == value && count < 9) {
        count += 1;
      } else {
        result += count + '' + value;
        count = 1;
        value = entry;
      }
    }
    result += count + '' + entry;
  }
  return result;
}

solvers["Encryption II: Vigenère Cipher"] = (_data) => {
  const result = [..._data[0]]
    .map((a, i) => {
      return a === " "
        ? a
        : String.fromCharCode(((a.charCodeAt(0) - 2 * 65 + _data[1].charCodeAt(i % _data[1].length)) % 26) + 65);
    })
    .join("");
  return result;
}

solvers["Encryption I: Caesar Cipher"] = (_data) => {
  const result = [..._data[0]]
    .map((a) => {
      return a === " "
        ? a
        : String.fromCharCode(((a.charCodeAt(0) - 65 - _data[1] + 26) % 26) + 65);
    })
    .join("");
  return result;
};

solvers["Square Root"] = (_data) => {
  const result = heronsMethodSqrt(BigInt(_data)).toString();
  return result;
};

function heronsMethodSqrt(n) {
  const maxIterations = 400;
  let iterations = 0;
  let x = 1n;

  while (!(x ** 2n <= n && (x + 1n) ** 2n > n)) {
    x = (x + n / x) / 2n;
    if (++iterations > maxIterations) return -1n;
  }

  return closerToRoot(n, x);
}

function closerToRoot(n, x) {
  return abs(n - x ** 2n) > abs(n - (x + 1n) ** 2n) ? x + 1n : x;
}

function abs(n) {
  return n < 0n ? -n : n;
}





function convert2DArrayToString(arr) {
  const components = [];
  arr.forEach((e) => {
    let s = e.toString();
    s = ["[", s, "]"].join("");
    components.push(s);
  });

  return components.join(",").replace(/\s/g, "");
}
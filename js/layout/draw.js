var Draw, _, polarToCartesian, ptc;

_ = require('underscore');

polarToCartesian = require('./engine').polarToCartesian;

ptc = polarToCartesian;

Draw = {
  arc: function(arg, thickness) {
    var endAngle, innerEndX, innerEndY, innerStartX, innerStartY, largeArc, outerEndX, outerEndY, outerStartX, outerStartY, path, radius, ref, ref1, ref2, ref3, startAngle;
    startAngle = arg.startAngle, endAngle = arg.endAngle, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    ref = ptc(radius, startAngle), innerStartX = ref.x, innerStartY = ref.y;
    ref1 = ptc(radius, endAngle), innerEndX = ref1.x, innerEndY = ref1.y;
    ref2 = ptc(radius + thickness, startAngle), outerStartX = ref2.x, outerStartY = ref2.y;
    ref3 = ptc(radius + thickness, endAngle), outerEndX = ref3.x, outerEndY = ref3.y;
    largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    path = ["M", innerStartX, innerStartY, "A", radius, radius, 0, largeArc, 1, innerEndX, innerEndY, "L", outerEndX, outerEndY, "A", radius + thickness, radius + thickness, 0, largeArc, 0, outerStartX, outerStartY, "Z"];
    return path.join(" ");
  },
  arc2: function(arg) {
    var radius, unknownEnd, unknownStart;
    unknownStart = arg.unknownStart, unknownEnd = arg.unknownEnd, radius = arg.radius;
    return this.arc({
      startAngle: unknownStart,
      endAngle: unknownEnd,
      radius: radius
    });
  },
  center: function(arg, thickness) {
    var endAngle, radius, ref, startAngle, x, y;
    startAngle = arg.startAngle, endAngle = arg.endAngle, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    return ref = ptc(radius + 30, (startAngle + endAngle) / 2), x = ref.x, y = ref.y, ref;
  },
  centerUnknown: function(arg, thickness) {
    var radius, ref, unknownEnd, unknownStart, x, y;
    unknownStart = arg.unknownStart, unknownEnd = arg.unknownEnd, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    return ref = ptc(radius + 10, (unknownStart + unknownEnd) / 2), x = ref.x, y = ref.y, ref;
  },
  startUnknown: function(arg, thickness) {
    var radius, ref, unknownEnd, unknownStart, x, y;
    unknownStart = arg.unknownStart, unknownEnd = arg.unknownEnd, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    return ref = ptc(radius + 10, unknownStart + 2.5), x = ref.x, y = ref.y, ref;
  },
  selfBinding: function(arg, thickness) {
    var endAngle, ex, ey, path, q1, q2, q3, q4, q5, q6, radius, ref, ref1, ref2, ref3, ref4, ref5, ref6, startAngle, x, x1, x2, y, y1, y2;
    startAngle = arg.startAngle, endAngle = arg.endAngle, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    ref = ptc(radius + thickness, startAngle + 2.5), x = ref.x, y = ref.y;
    ref1 = ptc(radius + thickness, startAngle - 2.5), ex = ref1.x, ey = ref1.y;
    ref2 = ptc(radius + thickness + 20, startAngle + 5), x1 = ref2.x, y1 = ref2.y;
    ref3 = ptc(radius + thickness + 10, startAngle + 7), q1 = ref3.x, q2 = ref3.y;
    ref4 = ptc(radius + thickness + 20, startAngle - 5), x2 = ref4.x, y2 = ref4.y;
    ref5 = ptc(radius + thickness + 30, startAngle), q3 = ref5.x, q4 = ref5.y;
    ref6 = ptc(radius + thickness + 10, startAngle - 7), q5 = ref6.x, q6 = ref6.y;
    path = ["M", x, y, "Q", q1, q2, x1, y1, "Q", q3, q4, x2, y2, "Q", q5, q6, ex, ey];
    return path.join(" ");
  },
  selfBinding234: function(arg, thickness) {
    var cx1, cx3, cx5, cx7, cy1, cy4, cy6, cy8, endAngle, path, radius, ref, ref1, ref2, ref3, ref4, ref5, ref6, startAngle, x, x1, x2, y, y1, y2;
    startAngle = arg.startAngle, endAngle = arg.endAngle, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    ref = ptc(radius + thickness, startAngle), x = ref.x, y = ref.y;
    ref1 = ptc(radius + thickness + 20, startAngle + 5), x1 = ref1.x, y1 = ref1.y;
    ref2 = ptc(radius + thickness + 20, startAngle + 7), cx1 = ref2.x, cy1 = ref2.y;
    ref3 = ptc(radius + thickness + 20, startAngle + 5), cx3 = ref3.x, cy4 = ref3.y;
    ref4 = ptc(radius + thickness + 20, startAngle - 5), x2 = ref4.x, y2 = ref4.y;
    ref5 = ptc(radius + thickness + 20, startAngle - 7), cx5 = ref5.x, cy6 = ref5.y;
    ref6 = ptc(radius + thickness + 20, startAngle - 5), cx7 = ref6.x, cy8 = ref6.y;
    path = ["M", x, y, "C", cx1, cy1, cx3, cy4, x1, y1, "C", cx5, cy6, cx7, cy8, x2, y2, "Z"];
    return path.join(" ");
  },
  selfBindingOld: function(arg, thickness) {
    var endAngle, path, radius, ref, ref1, ref2, startAngle, x, x1, x2, y, y1, y2;
    startAngle = arg.startAngle, endAngle = arg.endAngle, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    ref = ptc(radius + thickness, startAngle), x = ref.x, y = ref.y;
    ref1 = ptc(radius + thickness + 20, startAngle + 5), x1 = ref1.x, y1 = ref1.y;
    ref2 = ptc(radius + thickness + 20, startAngle - 5), x2 = ref2.x, y2 = ref2.y;
    path = ["M", x, y, "L", x1, y1, "L", x2, y2];
    return path.join(" ");
  },
  ticks: function(arg, thickness) {
    var angle, buildLine, endAngle, j, radius, ref, ref1, results, startAngle;
    startAngle = arg.startAngle, endAngle = arg.endAngle, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    buildLine = function(angle) {
      var endX, endY, path, ref, ref1, startX, startY;
      ref = ptc(radius + 15, angle), startX = ref.x, startY = ref.y;
      ref1 = ptc(radius + 20, angle), endX = ref1.x, endY = ref1.y;
      path = ["M", startX, startY, "L", endX, endY];
      return [path.join(" ")];
    };
    results = [];
    for (angle = j = ref = startAngle, ref1 = endAngle; j <= ref1; angle = j += 10) {
      results.push(buildLine(angle));
    }
    return results;
  },
  textDef: function(arg, thickness) {
    var endAngle, innerEndX, innerEndY, innerStartX, innerStartY, largeArc, path, radius, ref, ref1, startAngle;
    startAngle = arg.startAngle, endAngle = arg.endAngle, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    radius = radius + 30;
    ref = ptc(radius, startAngle), innerStartX = ref.x, innerStartY = ref.y;
    ref1 = ptc(radius, endAngle), innerEndX = ref1.x, innerEndY = ref1.y;
    largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    path = ["M", innerStartX, innerStartY, "A", radius, radius, 0, largeArc, 1, innerEndX, innerEndY];
    return path.join(" ");
  },
  link: function(participants) {
    var depth, parts, pinch;
    pinch = function(start, end) {
      return (end - start) * 0.4;
    };
    depth = 90;
    parts = [];
    participants = _.sortBy(participants, "startAngle");
    participants.map((function(_this) {
      return function(view, i) {
        var centered, endAngle, next, radius, startAngle;
        startAngle = view.startAngle, endAngle = view.endAngle, radius = view.radius;
        centered = _this.center(view);
        next = (i + 1) < participants.length ? participants[i + 1] : participants[0];
        return parts.push([i === 0 ? startAngle === endAngle ? ["M", ptc(radius, startAngle).x, ptc(radius, startAngle).y] : ["M", ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).x, ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).y] : void 0, startAngle === endAngle ? ["C", ptc(radius, startAngle).x, ptc(radius, startAngle).y, ptc(radius, startAngle).x, ptc(radius, startAngle).y, ptc(radius, startAngle).x, ptc(radius, startAngle).y] : ["C", ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).x, ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).y, ptc(radius - depth / 2, startAngle + pinch(startAngle, endAngle)).x, ptc(radius - depth / 2, startAngle + pinch(startAngle, endAngle)).y, ptc(radius, startAngle).x, ptc(radius, startAngle).y], ["A", radius, radius, 0, endAngle - startAngle <= 180 ? 0 : 1, 1, ptc(radius, endAngle).x, ptc(radius, endAngle).y], startAngle === endAngle ? ["C", ptc(radius, endAngle).x, ptc(radius, endAngle).y, ptc(radius, endAngle).x, ptc(radius, endAngle).y, ptc(radius, endAngle).x, ptc(radius, endAngle).y] : ["C", ptc(radius, endAngle).x, ptc(radius, endAngle).y, ptc(radius - depth / 2, endAngle - pinch(startAngle, endAngle)).x, ptc(radius - depth / 2, endAngle - pinch(startAngle, endAngle)).y, ptc(radius - depth, endAngle - pinch(startAngle, endAngle)).x, ptc(radius - depth, endAngle - pinch(startAngle, endAngle)).y], next ? next.startAngle === next.endAngle ? ["Q", 0, 0, ptc(next.radius, next.startAngle).x, ptc(next.radius, next.startAngle).y] : ["Q", 0, 0, ptc(next.radius - depth, next.startAngle + pinch(next.startAngle, next.endAngle)).x, ptc(next.radius - depth, next.startAngle + pinch(next.startAngle, next.endAngle)).y] : void 0]);
      };
    })(this));
    return _.flatten(parts).join(" ");
  }
};

module.exports = Draw;

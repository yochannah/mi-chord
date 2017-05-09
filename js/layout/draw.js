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
  textDef: function(arg, thickness) {
    var endAngle, innerEndX, innerEndY, innerStartX, innerStartY, largeArc, path, radius, ref, ref1, startAngle;
    startAngle = arg.startAngle, endAngle = arg.endAngle, radius = arg.radius;
    if (thickness == null) {
      thickness = 20;
    }
    ref = ptc(radius + 30, startAngle), innerStartX = ref.x, innerStartY = ref.y;
    ref1 = ptc(radius + 30, endAngle), innerEndX = ref1.x, innerEndY = ref1.y;
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
    participants.map(function(arg, i) {
      var endAngle, next, radius, startAngle;
      startAngle = arg.startAngle, endAngle = arg.endAngle, radius = arg.radius;
      next = (i + 1) < participants.length ? participants[i + 1] : participants[0];
      return parts.push([i === 0 ? startAngle === endAngle ? ["M", ptc(radius, startAngle).x, ptc(radius, startAngle).y] : ["M", ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).x, ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).y] : void 0, startAngle === endAngle ? ["C", ptc(radius, startAngle).x, ptc(radius, startAngle).y, ptc(radius, startAngle).x, ptc(radius, startAngle).y, ptc(radius, startAngle).x, ptc(radius, startAngle).y] : ["C", ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).x, ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).y, ptc(radius - depth / 2, startAngle + pinch(startAngle, endAngle)).x, ptc(radius - depth / 2, startAngle + pinch(startAngle, endAngle)).y, ptc(radius, startAngle).x, ptc(radius, startAngle).y], ["A", radius, radius, 0, endAngle - startAngle <= 180 ? 0 : 1, 1, ptc(radius, endAngle).x, ptc(radius, endAngle).y], startAngle === endAngle ? ["C", ptc(radius, endAngle).x, ptc(radius, endAngle).y, ptc(radius, endAngle).x, ptc(radius, endAngle).y, ptc(radius, endAngle).x, ptc(radius, endAngle).y] : ["C", ptc(radius, endAngle).x, ptc(radius, endAngle).y, ptc(radius - depth / 2, endAngle - pinch(startAngle, endAngle)).x, ptc(radius - depth / 2, endAngle - pinch(startAngle, endAngle)).y, ptc(radius - depth, endAngle - pinch(startAngle, endAngle)).x, ptc(radius - depth, endAngle - pinch(startAngle, endAngle)).y], next ? next.startAngle === next.endAngle ? ["Q", 0, 0, ptc(next.radius, next.startAngle).x, ptc(next.radius, next.startAngle).y] : ["Q", 0, 0, ptc(next.radius - depth, next.startAngle + pinch(next.startAngle, next.endAngle)).x, ptc(next.radius - depth, next.startAngle + pinch(next.startAngle, next.endAngle)).y] : void 0]);
    });
    return _.flatten(parts).join(" ");
  }
};

module.exports = Draw;

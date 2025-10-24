# Create minimalist SVG logo files for RoboticConcrete.com using the "CC" icon,
# including a variant with a simple robotic 3D-print nozzle, and an inline wordmark composition.
#
# Files saved to /mnt/data:
# - rc_cc_icon.svg                    (clean CC icon)
# - rc_cc_robot_nozzle.svg           (CC icon + simple robot/print head)
# - roboticconcrete_wordmark_inline.svg  ("roboti [CC icon] oncrete" inline lockup)

import math

def c_path(cx, cy, R, r, open_angle_deg=70, rotate_deg=0):
    """
    Build an SVG path string for a 'C' letter as a ring sector with an open gap.
    cx, cy: center
    R: outer radius
    r: inner radius
    open_angle_deg: size of the opening (gap) in degrees
    rotate_deg: rotation of the 'C'
    """
    # Angles (SVG arc uses end points). We'll draw from start angle to end angle (big arc), leaving a gap.
    # We'll orient the gap centered on the +x axis (to look like a 'C'), then rotate.
    gap = math.radians(open_angle_deg)
    start = -gap/2
    end = 2*math.pi - gap/2

    def pol2cart(angle, radius):
        return (cx + radius*math.cos(angle), cy + radius*math.sin(angle))

    # apply rotation
    rot = math.radians(rotate_deg)
    def rot_point(x, y):
        xr = (x - cx)*math.cos(rot) - (y - cy)*math.sin(rot) + cx
        yr = (x - cx)*math.sin(rot) + (y - cy)*math.cos(rot) + cy
        return xr, yr

    # Outer arc start/end
    x1, y1 = pol2cart(start, R)
    x2, y2 = pol2cart(end, R)
    # Inner arc start/end (reverse direction)
    x3, y3 = pol2cart(end, r)
    x4, y4 = pol2cart(start, r)

    # rotate points
    x1,y1 = rot_point(x1,y1)
    x2,y2 = rot_point(x2,y2)
    x3,y3 = rot_point(x3,y3)
    x4,y4 = rot_point(x4,y4)

    # large-arc-flag should be 1 because we cover > 180 degrees
    laf = 1
    # sweep-flag: 1 for cw on outer
    path = (
        f"M {x1:.3f},{y1:.3f} "
        f"A {R:.3f},{R:.3f} 0 {laf} 1 {x2:.3f},{y2:.3f} "
        f"L {x3:.3f},{y3:.3f} "
        f"A {r:.3f},{r:.3f} 0 {laf} 0 {x4:.3f},{y4:.3f} Z"
    )
    return path

def make_cc_svg(filename, with_robot=False, add_layers=False, width=800, height=600, color="#111111", bg=None):
    # Canvas
    W, H = width, height
    # Golden ratio for spacing
    phi = (1 + 5**0.5)/2
    # geometry
    cx1 = W*0.35
    cx2 = W*0.65
    cy = H*0.55
    R = min(W, H)*0.26
    thickness = R/phi/1.2  # balanced stroke-like thickness
    r = R - thickness
    open_angle = 78  # gap size for the C opening

    paths = []
    paths.append(f'<path d="{c_path(cx1, cy, R, r, open_angle)}" fill="{color}" />')
    paths.append(f'<path d="{c_path(cx2, cy, R, r, open_angle)}" fill="{color}" />')

    # Optional: subtle "printed layers" inside left C as thin horizontal bars
    if add_layers:
        layer_count = 4
        layer_gap = thickness/(layer_count+2)
        y0 = cy - thickness/2 + layer_gap
        for i in range(layer_count):
            y = y0 + i*(layer_gap + layer_gap*0.7)
            # Short rounded rectangles representing layers
            x_left = cx1 - r*0.75
            x_right = cx1 - r*0.1
            radius = layer_gap*0.45
            paths.append(f'<rect x="{x_left:.1f}" y="{y:.1f}" width="{(x_right-x_left):.1f}" height="{layer_gap:.1f}" rx="{radius:.2f}" ry="{radius:.2f}" fill="{color}" opacity="0.7" />')

    # Optional: robot/gantry print head centered above the CC pair
    robot = ""
    if with_robot:
        # Simple gantry + nozzle built from basic shapes, sized relative to R
        head_w = R*0.9
        head_h = R*0.36
        head_rx = head_h*0.25
        head_cx = (cx1+cx2)/2
        head_cy = cy - R - head_h*0.9
        eye_r = head_h*0.11
        arm_w = head_w*0.82
        arm_h = head_h*0.35
        nozzle_h = head_h*0.45
        nozzle_w = head_h*0.22

        robot = f"""
        <rect x="{head_cx-head_w/2:.1f}" y="{head_cy:.1f}" width="{head_w:.1f}" height="{head_h:.1f}" rx="{head_rx:.1f}" ry="{head_rx:.1f}" fill="{color}" />
        <circle cx="{head_cx-head_w*0.22:.1f}" cy="{head_cy+head_h*0.48:.1f}" r="{eye_r:.1f}" fill="#fff"/>
        <circle cx="{head_cx+head_w*0.22:.1f}" cy="{head_cy+head_h*0.48:.1f}" r="{eye_r:.1f}" fill="#fff"/>
        <rect x="{head_cx-arm_w/2:.1f}" y="{head_cy+head_h:.1f}" width="{arm_w:.1f}" height="{arm_h:.1f}" rx="{arm_h*0.3:.1f}" ry="{arm_h*0.3:.1f}" fill="{color}" />
        <rect x="{head_cx-head_h*0.15:.1f}" y="{head_cy+head_h+arm_h:.1f}" width="{head_h*0.3:.1f}" height="{nozzle_h:.1f}" fill="{color}" />
        <polygon points="{head_cx:.1f},{head_cy+head_h+arm_h+nozzle_h:.1f} {head_cx-nozzle_w/2:.1f},{head_cy+head_h+arm_h+nozzle_h*0.7:.1f} {head_cx+nozzle_w/2:.1f},{head_cy+head_h+arm_h+nozzle_h*0.7:.1f}" fill="{color}" />
        """

    bg_rect = f'<rect width="100%" height="100%" fill="{bg}"/>' if bg else ""

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
    {bg_rect}
    {"".join(paths)}
    {robot}
    </svg>'''
    with open(filename, "w") as f:
        f.write(svg)

# Create files
make_cc_svg("rc_cc_icon.svg", with_robot=False, add_layers=False, width=1200, height=900)
make_cc_svg("rc_cc_robot_nozzle.svg", with_robot=True, add_layers=True, width=1200, height=900)

# Create inline wordmark composition: roboti [CC icon] oncrete
def make_inline_wordmark(filename, color="#111111"):
    W, H = 2000, 400
    # Positions
    text_left = 80
    baseline = 260
    font_size = 180  # note: text rendering depends on environment; we'll outline a simple geometric "CC" to ensure consistency
    # CC icon parameters
    cx1 = 940
    cx2 = 1140
    cy = baseline - 10
    R = 120
    thickness = 52
    r = R - thickness
    open_angle = 78

    left_text = "roboti"
    right_text = "oncrete"

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
      <style>
        .word {{ font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,sans-serif; font-weight: 800; fill: {color}; }}
      </style>
      <text x="{text_left}" y="{baseline}" class="word" font-size="{font_size}">{left_text}</text>
      <path d="{c_path(cx1, cy, R, r, open_angle)}" fill="{color}" />
      <path d="{c_path(cx2, cy, R, r, open_angle)}" fill="{color}" />
      <text x="{cx2+R+40}" y="{baseline}" class="word" font-size="{font_size}">{right_text}</text>
    </svg>'''
    with open(filename, "w") as f:
        f.write(svg)

make_inline_wordmark("roboticconcrete_wordmark_inline.svg")

# Create wordmark with gap for logo.png
def make_wordmark_with_gap(filename, color="#111111"):
    W, H = 2000, 400
    # Positions
    text_left = 80
    baseline = 260
    font_size = 180
    # Gap parameters (where logo.png will be placed) - larger gap for 60px logo
    gap_start = 900
    gap_end = 1100
    gap_width = gap_end - gap_start
    cy = baseline - 10
    
    left_text = "roboti"
    right_text = "oncrete"

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
      <style>
        .word {{ font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Arial,sans-serif; font-weight: 800; fill: {color}; }}
      </style>
      <text x="{text_left}" y="{baseline}" class="word" font-size="{font_size}">{left_text}</text>
      <text x="{gap_end + 20}" y="{baseline}" class="word" font-size="{font_size}">{right_text}</text>
    </svg>'''
    with open(filename, "w") as f:
        f.write(svg)

make_wordmark_with_gap("roboticconcrete_wordmark_gap.svg")

print("Created files:")
print("rc_cc_icon.svg")
print("rc_cc_robot_nozzle.svg")
print("roboticconcrete_wordmark_inline.svg")
print("roboticconcrete_wordmark_gap.svg")

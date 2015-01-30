# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := wrapper
DEFS_Debug := \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-pthread \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions

INCS_Debug := \
	-I/root/.node-gyp/0.10.34/src \
	-I/root/.node-gyp/0.10.34/deps/uv/include \
	-I/root/.node-gyp/0.10.34/deps/v8/include

DEFS_Release := \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-pthread \
	-O2 \
	-fno-strict-aliasing \
	-fno-tree-vrp \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions

INCS_Release := \
	-I/root/.node-gyp/0.10.34/src \
	-I/root/.node-gyp/0.10.34/deps/uv/include \
	-I/root/.node-gyp/0.10.34/deps/v8/include

OBJS := \
	$(obj).target/$(TARGET)/wrapper.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic

LDFLAGS_Release := \
	-pthread \
	-rdynamic

LIBS := \
	../ledscape/ledscape.o \
	../ledscape/pru.o \
	../ledscape/am335x/app_loader/interface/release/prussdrv.o

$(obj).target/wrapper.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/wrapper.node: LIBS := $(LIBS)
$(obj).target/wrapper.node: TOOLSET := $(TOOLSET)
$(obj).target/wrapper.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/wrapper.node
# Add target alias
.PHONY: wrapper
wrapper: $(builddir)/wrapper.node

# Copy this to the executable output path.
$(builddir)/wrapper.node: TOOLSET := $(TOOLSET)
$(builddir)/wrapper.node: $(obj).target/wrapper.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/wrapper.node
# Short alias for building this executable.
.PHONY: wrapper.node
wrapper.node: $(obj).target/wrapper.node $(builddir)/wrapper.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/wrapper.node


<template>
  <div>
    <div ref="gantt" class="gantt-app"></div>
  </div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import dayjs from "dayjs";
export default {
  name: "xlmGantt",

  props: {
    createdIsNeed: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: "全天用车情况",
    },

    date: {
      type: String,
      default: dayjs().format("YYYY-MM-DD"),
    },

    columns: {
      type: Array,
      default: () => [
        {
          name: "vehicleBase",
          label: "基地",
          align: "center",
          width: 120,
        },
        {
          name: "vehicleLicensePlate",
          label: "车牌号",
          align: "center",
          width: 120,
        },
        {
          name: "vehicleBrand",
          label: "品牌",
          align: "center",
          width: 120,
        },
        {
          name: "vehicleSeat",
          label: "座位数",
          align: "center",
          max_width: 120,
        },
      ],
    },
  },

  data() {
    return {
      tasks: {
        data: [],
      },
    };
  },

  mounted() {
    // if (this.createdIsNeed) {
    //   this.$nextTick(() => {
    //     this.init();
    //   });
    // }
  },

  methods: {
    render(data) {
      Array.isArray(data) ? (this.tasks.data = data) : (this.tasks = data);
      this.$nextTick(() => {
        this.init();
      });
    },

    init() {
      gantt.config.work_time = true;
      gantt.config.date_format = "%Y-%m-%d %H-%i";
      gantt.config.min_column_width = 50;
      gantt.config.duration_unit = "minute";
      gantt.config.duration_step = 1;
      gantt.config.scale_height = 75;
      gantt.config.scales = [
        { unit: "hour", step: 1, format: "%H:00" },
        { unit: "day", step: "1", format: this.title },
      ];
      gantt.config.start_date = dayjs(this.date).format("YYYY-MM-DD 00:00");
      gantt.config.end_date = dayjs(this.date).format("YYYY-MM-DD 23:59");
      gantt.config.types.milestone = "milestone";
      gantt.config.columns = this.columns;
      gantt.config.autofit = true;
      gantt.config.fit_tasks = true;
      gantt.config.grid_width = 400;
      gantt.config.readonly = true;

      gantt.plugins({
        tooltip: true,
      });

      gantt.templates.task_text = function (start, end, task) {
        return `${dayjs(start).format("HH:mm")}~${dayjs(end).format(
          "HH:mm"
        )} 司机：${task.driver}`;
      };

      gantt.init(this.$refs.gantt);
      gantt.parse(this.tasks);

      gantt.attachEvent("onTaskClick", (id) => {
        this.$emit("onClick", id);
        return true;
      });

      gantt.templates.tooltip_text = function (start, end, task) {
        const driver = task.driver ? task.driver : "";
        return (
          "<b>开始时间：</b>" +
          dayjs(start).format("YYYY-MM-DD HH:mm") +
          "</br><b>结束时间：</b>" +
          dayjs(end).format("YYYY-MM-DD HH:mm") +
          "</br><b>司机：</b>" +
          driver
        );
      };
    },

    rerender() {
      this.$nextTick(() => {
        gantt.clearAll();
        gantt.config.start_date = dayjs(this.date).format("YYYY-MM-DD 00:00");
        gantt.config.end_date = dayjs(this.date).format("YYYY-MM-DD 23:59");
        gantt.parse(this.tasks);
        gantt.render();
        gantt.refreshData();
        this.$emit("rerender");
      });
    },
  },

  destroyed() {
    gantt.destructor();
  },
};
</script>

<style lang="scss" scoped>
.gantt-app {
  min-height: 600px;
}

::v-deep .gantt_grid_scale,
::v-deep .gantt_task_scale,
::v-deep .gantt_task_vscroll {
  background-color: #f5f7fa;
}

::v-deep .gantt_task_line {
  background-color: #ff6a00;
  border: unset;
}

::v-deep .gantt_grid_scale .gantt_grid_head_cell:not(:last-child) {
  border-right: 1px solid #cecece !important;
}

::v-deep .gantt_grid_data .gantt_cell:not(:last-child) {
  border-right: 1px solid #cecece;
}

::v-deep .gantt_grid_data .gantt_row.odd:hover,
::v-deep .gantt_grid_data .gantt_row:hover,
::v-deep .gantt_grid_dara .gantt_row .gantt_select,
::v-deep .gantt_grid_data .gantt_row.odd.gantt_selected,
::v-deep .gantt_task_row.gantt_selected {
  background-color: #f5f5f5;
}

::v-deep .gantt_grid_data .gantt_row.gantt_selected {
  background-color: #f5f5f5;
}

::v-deep .gantt_task_row.gantt_selected .gantt_task_cell {
  border-right-color: #ebebeb;
}
</style>

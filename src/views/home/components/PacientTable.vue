<template>
  <div>
    <table class="w-full">
      <thead>
        <tr class="bg-slate-200">
          <th class="rounded-tl-md">Name</th>
          <th>Gender</th>
          <th>Birth</th>
          <th class="text-center rounded-tr-md">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-y border-slate-300 hover:bg-zinc-200">
          <td>João Küster</td>
          <td>Male</td>
          <td>30/06/1995</td>
          <td class="text-center">
            <button
              class="py-1 px-5 bg-slate-800 text-slate-50 rounded-md shadow shadow-slate-600"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

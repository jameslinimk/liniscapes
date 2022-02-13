<script lang="ts">
	import { game } from "./ts/game";
</script>

<main>
	<div class="board" style="--columns: {$game.board.length}; --rows: {$game.board.length}">
		{#each $game.board as row}
			{#each row as letter}
				<div class="box">{letter}</div>
			{/each}
		{/each}
	</div>
</main>

<style>
	.board {
		display: grid;
		zoom: 100%;
		grid-template-columns: repeat(var(--columns), 1fr);
		grid-template-rows: repeat(var(--rows), 5vh);
		gap: 10px;
		justify-content: center;
		align-content: center;
	}

	.box {
		background-color: tomato;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 300%;
	}
</style>

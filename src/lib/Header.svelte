<script lang="ts">
    import * as constants from "$lib/constants";
</script>
  
<header>
    <div class="header-content">
        <h1>{ constants.title }</h1>
        <nav>
        <ul>
            <li><a href={ constants.homeLoc }>Home</a></li>
            <li><a href={ constants.historyLoc }>History</a></li>
            <li><a href={ constants.settingsLoc }>Settings</a></li>
        </ul>
        </nav>
    </div>
</header>
  
<style>
    header {
        background: #333;
        color: white;
        padding: 1rem;
    }
    .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    h1 {
        margin: 0;
        font-size: 1.5rem;
    }
    nav {
        display: flex;
        flex: 1;
        justify-content: center;
    }
    nav ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    nav ul li {
        margin: 0 1rem;
    }
    nav ul li a {
        color: white;
        text-decoration: none;
    }
</style>